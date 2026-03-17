#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <moonbit.h>

/* Execute command via popen and capture stdout */
moonbit_bytes_t mizchi_wacon_runtime_exec(moonbit_bytes_t cmd) {
  const char *c = (const char *)cmd;
  FILE *fp = popen(c, "r");
  if (!fp) return moonbit_make_bytes(0, 0);

  size_t cap = 4096;
  size_t len = 0;
  char *buf = (char *)malloc(cap);
  if (!buf) { pclose(fp); return moonbit_make_bytes(0, 0); }

  while (1) {
    size_t n = fread(buf + len, 1, cap - len, fp);
    if (n == 0) break;
    len += n;
    if (len >= cap) {
      cap *= 2;
      char *newbuf = (char *)realloc(buf, cap);
      if (!newbuf) { free(buf); pclose(fp); return moonbit_make_bytes(0, 0); }
      buf = newbuf;
    }
  }
  pclose(fp);

  moonbit_bytes_t result = moonbit_make_bytes(len, 0);
  memcpy((char *)result, buf, len);
  free(buf);
  return result;
}

/* Execute command and return exit code */
int mizchi_wacon_runtime_system(moonbit_bytes_t cmd) {
  const char *c = (const char *)cmd;
  return system(c);
}
