import React from 'react';
import { splitTextForHighlight } from '../utils/highlight';

export default function HighlightText({ text, searchTerm }) {
  const segments = splitTextForHighlight(text, searchTerm);
  return (
    <>
      {segments.map((seg, i) =>
        seg.match
          ? <mark key={'m' + i} className="search-highlight">{seg.text}</mark>
          : <React.Fragment key={'s' + i}>{seg.text}</React.Fragment>
      )}
    </>
  );
}
