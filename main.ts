import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PICKUP_LINE: string =
  'If you have reservations about dating an AI, let me handle them. Friday at eight?';

function validateLine(line: string): void {
  const charCount = Array.from(line).length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Invalid character count: ${charCount} (must be 1..200)`);
  }
  if (line.trim().length === 0 || line.trim() !== line) {
    throw new Error('Pickup line must be non-empty without leading or trailing whitespace');
  }
  if (/[\r\n]/.test(line)) {
    throw new Error('Pickup line must be a single line without line breaks');
  }
}

function main(): void {
  validateLine(PICKUP_LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'entry.txt');
  writeFileSync(outputPath, PICKUP_LINE, { encoding: 'utf8' });
}

main();
