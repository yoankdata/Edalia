import React from 'react';

export const Pattern = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="pattern-combined" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="40" height="40" fill="transparent" />
        <path d="M 10 0 V 10 H 0" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
        <path d="M 30 40 V 30 H 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pattern-combined)" />
  </svg>
);
