// Minimal C program for RV32I bare metal
// Uses Linux RISC-V syscall convention directly

static long syscall3(long num, long a0, long a1, long a2) {
    register long a7 __asm__("a7") = num;
    register long ra0 __asm__("a0") = a0;
    register long ra1 __asm__("a1") = a1;
    register long ra2 __asm__("a2") = a2;
    __asm__ volatile("ecall"
                     : "+r"(ra0)
                     : "r"(a7), "r"(ra1), "r"(ra2)
                     : "memory");
    return ra0;
}

static void write(int fd, const char *buf, long len) {
    syscall3(64, fd, (long)buf, len);
}

static void exit(int code) {
    syscall3(93, code, 0, 0);
    __builtin_unreachable();
}

void _start(void) {
    const char msg[] = "hello from C on rv32i!\n";
    write(1, msg, sizeof(msg) - 1);
    exit(0);
}
