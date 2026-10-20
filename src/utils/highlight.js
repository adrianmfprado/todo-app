export function splitTextForHighlight(text, searchTerm) {
  const str = String(text == null ? '' : text);
  const term = String(searchTerm == null ? '' : searchTerm).trim();
  if (!term || !str) {
    return [{ text: str, match: false }];
  }
  const lowerStr = str.toLowerCase();
  const lowerTerm = term.toLowerCase();
  if (lowerTerm.length === 0 || lowerTerm.length > lowerStr.length) {
    return [{ text: str, match: false }];
  }
  const segments = [];
  let i = 0;
  while (i < str.length) {
    const idx = lowerStr.indexOf(lowerTerm, i);
    if (idx === -1) {
      segments.push({ text: str.slice(i), match: false });
      break;
    }
    if (idx > i) {
      segments.push({ text: str.slice(i, idx), match: false });
    }
    segments.push({ text: str.slice(idx, idx + lowerTerm.length), match: true });
    i = idx + lowerTerm.length;
  }
  return segments;
}
