/**
 * Insert commentaries from a JSON file into src/data/commentary-notes.ts
 *
 * Usage: node scripts/insert-commentaries.mjs <json-file> [section-title]
 */

import { readFileSync, writeFileSync } from 'fs';

const jsonFile = process.argv[2];
const sectionTitle = process.argv[3] || '';

if (!jsonFile) {
  console.error('Usage: node scripts/insert-commentaries.mjs <json-file> [section-title]');
  process.exit(1);
}

const commentaries = JSON.parse(readFileSync(jsonFile, 'utf-8'));
let content = readFileSync('src/data/commentary-notes.ts', 'utf-8');

const insertBefore = '\n};\n\n/**\n * Get commentary';
const idx = content.indexOf(insertBefore);
if (idx === -1) { console.error('Insert point not found'); process.exit(1); }

/** Escape text for use inside a backtick template literal */
function escapeBacktick(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

const lines = [];
if (sectionTitle) {
  lines.push('');
  lines.push(`  // ==================== ${sectionTitle} ====================`);
  lines.push('');
}

for (const [key, entry] of Object.entries(commentaries)) {
  lines.push(`  // ${entry.reference} — ${entry.title}`);
  lines.push(`  "${key}": {`);
  lines.push(`    reference: \`${escapeBacktick(entry.reference)}\`,`);
  lines.push(`    title: \`${escapeBacktick(entry.title)}\`,`);
  lines.push(`    context: \`${escapeBacktick(entry.context)}\`,`);
  lines.push(`    keyWords: [`);
  for (const kw of entry.keyWords) {
    lines.push(`      { word: \`${escapeBacktick(kw.word)}\`, explanation: \`${escapeBacktick(kw.explanation)}\` },`);
  }
  lines.push(`    ],`);
  lines.push(`    structure: \`${escapeBacktick(entry.structure)}\`,`);
  lines.push(`    theologicalThemes: [`);
  for (const t of entry.theologicalThemes) {
    lines.push(`      \`${escapeBacktick(t)}\`,`);
  }
  lines.push(`    ],`);
  lines.push(`    applicationHints: [`);
  for (const h of entry.applicationHints) {
    lines.push(`      \`${escapeBacktick(h)}\`,`);
  }
  lines.push(`    ],`);
  lines.push(`    verseNotes: [`);
  for (const vn of entry.verseNotes) {
    lines.push(`      { verse: ${vn.verse}, note: \`${escapeBacktick(vn.note)}\` },`);
  }
  lines.push(`    ],`);
  lines.push(`  },`);
  lines.push('');
}

const newSection = lines.join('\n');
content = content.slice(0, idx) + newSection + content.slice(idx);
writeFileSync('src/data/commentary-notes.ts', content);

console.log(`Inserted ${Object.keys(commentaries).length} commentaries from ${jsonFile}`);
