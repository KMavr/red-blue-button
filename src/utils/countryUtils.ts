export function countryFlag(code: string): string {
  if (code === 'XX' || code.length !== 2) return '🌐';
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join('');
}

export function countryName(code: string, locale: string): string {
  if (code === 'XX') return 'Unknown';
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}
