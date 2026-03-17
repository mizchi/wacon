#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <errno.h>
#include <moonbit.h>

/* Recursively create directories */
int mizchi_wacon_store_mkdir_p(moonbit_bytes_t path) {
  const char *p = (const char *)path;
  char tmp[1024];
  size_t len = strlen(p);
  if (len >= sizeof(tmp)) return -1;
  memcpy(tmp, p, len + 1);
  for (size_t i = 1; i < len; i++) {
    if (tmp[i] == '/') {
      tmp[i] = 0;
      mkdir(tmp, 0755);
      tmp[i] = '/';
    }
  }
  return mkdir(tmp, 0755) == 0 || errno == EEXIST ? 0 : -1;
}

/* Write bytes to file */
int mizchi_wacon_store_write_file(moonbit_bytes_t path, moonbit_bytes_t data, int data_len) {
  const char *p = (const char *)path;
  FILE *f = fopen(p, "wb");
  if (!f) return -1;
  size_t written = fwrite((const char *)data, 1, (size_t)data_len, f);
  fclose(f);
  return (int)written == data_len ? 0 : -1;
}

/* Read file into bytes */
moonbit_bytes_t mizchi_wacon_store_read_file(moonbit_bytes_t path) {
  const char *p = (const char *)path;
  FILE *f = fopen(p, "rb");
  if (!f) return moonbit_make_bytes(0, 0);
  fseek(f, 0, SEEK_END);
  long size = ftell(f);
  fseek(f, 0, SEEK_SET);
  moonbit_bytes_t buf = moonbit_make_bytes(size, 0);
  fread((char *)buf, 1, size, f);
  fclose(f);
  return buf;
}

/* Check if file exists */
int mizchi_wacon_store_file_exists(moonbit_bytes_t path) {
  const char *p = (const char *)path;
  struct stat st;
  return stat(p, &st) == 0 ? 1 : 0;
}
