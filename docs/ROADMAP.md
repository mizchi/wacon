# wacon Roadmap

## 現状 (2026-03-18)

### 動くもの
- `echo`, `cat` — busybox の軽いコマンドが 14-35ms でブラウザ実行
- OCI レジストリからの pull (Docker Hub)
- 自前 WASM VM (hello world)
- RV32I / RV64IMACFD エミュレータ
- ELF64 ローダー (PIE + RELA リロケーション)
- 仮想ファイルシステム (VFS)
- 30+ Linux syscall スタブ

### 動かないもの
- `ls /` — 200M ステップでも完走しない (busybox ls の初期化が重い)
- `sh` — stdin 読み取り + fork/exec が未実装
- 動的リンクバイナリ — ld-musl 未対応

---

## Phase 1: ls を動かす

### 1a. ステップ上限問題の解決

busybox `ls` は `echo` の数十倍の命令を実行する。選択肢:

- **Web Worker 化**: メインスレッドをブロックせず、Worker 内で実行。進捗を `postMessage` で送信
- **ステップ上限撤廃 + yield**: 一定ステップごとに `setTimeout(0)` で UI に制御を返す
- **busybox 最小ビルド**: `CONFIG_FEATURE_LS_*` を全部無効にしてリビルド

### 1b. busybox ls が必要とする syscall

`fstatat`, `openat`, `getdents64`, `writev` は実装済み。
追加で必要かもしれないもの:
- `dup2` / `dup3` — fd 複製
- `fcntl(F_GETFL)` — fd フラグ取得

---

## Phase 2: インタラクティブシェル (sh)

### 必要なもの

1. **stdin 入力**: ブラウザからの入力を xterm.js → emulator に渡す。`read(0, ...)` がデータを返せるように
2. **非同期実行**: CPU ループを中断して入力待ち → 入力が来たら再開
3. **fork / clone**: メモリ空間のコピー、子プロセス管理
4. **execve**: ELF 再ロード、argv/envp 再設定
5. **wait4 / waitpid**: 子プロセスの終了待ち
6. **pipe2**: パイプ (`ls | grep`)
7. **dup2**: fd リダイレクト (`> file`, `2>&1`)

### 実装案

```
Phase 2a: stdin → read(0) → sh のプロンプトが出る
Phase 2b: fork + execve → sh から echo が動く
Phase 2c: pipe + dup2 → パイプライン
```

fork は最も複雑。16MB のメモリを丸ごとコピーするか、Copy-on-Write を実装するか。

---

## Phase 3: OCI イメージの rootfs マウント

### tar → VFS

現在の VFS は手動で Alpine 風ディレクトリを作っている。実際の OCI レイヤー (tar.gz) を VFS にマウントできるようにする。

1. tar パーサー: ヘッダ解析、ファイル/ディレクトリ/シンボリックリンク抽出
2. OCI レイヤーの overlay: 複数レイヤーを順番に重ねる
3. `wacon pull` → `wacon run` のパイプラインをブラウザで完結

### ゴール

```
wacon pull docker.io/library/alpine:latest
wacon run alpine sh
/ # ls
/ # cat /etc/os-release
```

---

## Phase 4: 高速化

### JIT コンパイル

インタプリタの限界は ~10M IPS (instructions per second)。busybox ls には ~500M 命令が必要 → 50秒。

JIT の選択肢:
- **WASM JIT**: RV64 → WASM に動的コンパイル、ブラウザの WASM エンジンで実行
- **Basic Block Cache**: デコード済み命令列をキャッシュ
- **Threaded Code**: 命令をネイティブ関数ポインタに変換

### メモリ最適化

- ArrayBuffer + DataView: MoonBit の FixedArray[Byte] → JS の ArrayBuffer
- SharedArrayBuffer: Web Worker 間でメモリ共有

---

## Phase 5: ネットワーク

### 仮想ネットワークスタック

- `socket` / `connect` / `send` / `recv` syscall
- TCP → WebSocket ブリッジ
- DNS stub (`/etc/resolv.conf`)

### ゴール

```
/ # wget http://example.com
/ # curl ifconfig.me
```

---

## Phase 6: マルチプロセス・本格 OS

- プロセステーブル、PID 管理
- シグナル配送 (SIGINT, SIGCHLD, SIGPIPE)
- /proc ファイルシステム (動的生成)
- init プロセス

---

## elfconv との比較 (2026-03-18)

[elfconv](https://github.com/yomaytk/elfconv) は ELF (AArch64) → WASM の AOT 変換ツール。

| | wacon (RV64 インタプリタ) | elfconv (AOT) |
|---|---|---|
| **ランタイム** | 225KB JS | 532KB JS |
| **busybox** | 998KB ELF | ~10MB WASM |
| **合計転送サイズ** | **~1.2MB** | **~10.5MB** |
| **echo 速度** | 25-35ms | <1ms (推定) |
| **ls 速度** | timeout (200M steps) | 即座 |
| **fork/exec** | 未実装 | 対応済み |
| **対応アーキ** | RISC-V 64 | AArch64 のみ |

### 考察

- elfconv は AOT なのでネイティブ並の速度だが、WASM バイナリが巨大（元 ELF の 5-10 倍）
- wacon は ELF をそのままロードするので転送サイズは小さいが、インタプリタの速度限界がある
- ハイブリッド案: ホットパスだけ WASM に JIT コンパイルし、コールドパスはインタプリタで実行
- elfconv は AArch64 のみ。wacon に RV64→WASM の AOT 変換を追加すれば両方の利点を取れる可能性

## 技術的メモ

### busybox の命令コスト

| コマンド | 実行ステップ | 時間 (browser) |
|---------|------------|---------------|
| echo | ~1M | 25-35ms |
| cat | ~0.5M | 14-19ms |
| ls | ~500M+ | timeout |

### RV64 エミュレータの速度

- Native (MoonBit → C): ~50M IPS (推定)
- JS (MoonBit → JS): ~10M IPS (推定)
- ボトルネック: Int64 演算が JS では BigInt に変換される

### busybox ls が遅い理由

1. musl の `__libc_start_main` 初期化
2. busybox のアプレット検索テーブル構築
3. ロケール初期化
4. `fstatat` で各ディレクトリエントリの stat 取得
5. カラム幅計算のための文字列処理
6. printf 系の数値→文字列変換
