export function getGraceMs() {
  const val = process.env.NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS;
  return val ? parseInt(val, 10) : 43200000;
}
