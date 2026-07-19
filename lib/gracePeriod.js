export function getGraceMs() {
  const val = process.env.NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS;
  const ms = parseInt(val, 10);
  if (!val || isNaN(ms) || ms <= 0) {
    throw new Error(
      "NEXT_PUBLIC_DELETION_GRACE_PERIOD_MS must be set to a positive number",
    );
  }
  return ms;
}
