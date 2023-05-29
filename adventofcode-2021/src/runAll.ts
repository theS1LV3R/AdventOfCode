import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

async function runAll() {
  const days = readdirSync(dirname(fileURLToPath(import.meta.url))).filter(
    (dir) => !!dir.match(/day\d+$/),
  );

  for (const day of days) {
    console.log(`===== Running ${day} =====`);
    await import(`./${day}/${day}`).then(() => console.log(''));
  }
}

runAll();
