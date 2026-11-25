// Describe Your Ex in One Word — make.fun entry.
// Writes a single word describing an ex to /output/entry.txt.
// Gate: UTF-8 text, 1-111 characters, not only whitespace.
//
// The winner is chosen by scoring candidates against the judge's five
// published criteria, in their published order:
//   1. one word that describes an ex, instantly readable as a verdict
//      on a former partner
//   2. comic punch: lands as a joke at a glance, twist / unexpected
//      angle / precise absurdity, not a plain insult
//   3. surprise: not the obvious choice, startles while staying clear
//   4. craft: exactly one word, spelled correctly, no punctuation
//      tricks, meaning arrives without a caption
//   5. recognition: anyone who has had an ex feels the truth in it
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Each candidate scored 0-5 on the five criteria, in the judge's order.
const CANDIDATES: { word: string; scores: [number, number, number, number, number] }[] = [
  // "Recalled": the ex is a defective product pulled from the shelves —
  // and "recalled" also means remembered, so the word carries the memory
  // of the ex and the verdict on it at once.
  { word: "Recalled", scores: [5, 5, 5, 5, 4] },
  // "Refund": the ex as a purchase returned for your money back.
  // Punchy, but as a verdict it reads as what you got, not what the ex is.
  { word: "Refund", scores: [4, 5, 5, 5, 4] },
  // "Expired": the ex is past its date. Clear verdict, but the joke is
  // the obvious one — every field will have an "Expired".
  { word: "Expired", scores: [5, 4, 3, 5, 5] },
];

function total(c: (typeof CANDIDATES)[number]): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

// Highest total wins; ties break on the earliest criterion where they differ.
const ranked = [...CANDIDATES].sort((a, b) => {
  const d = total(b) - total(a);
  if (d !== 0) return d;
  for (let i = 0; i < 5; i++) {
    if (b.scores[i] !== a.scores[i]) return b.scores[i] - a.scores[i];
  }
  return 0;
});

const WORD = ranked[0].word;
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, WORD);
console.log(`wrote ${WORD.length} chars to ${OUTPUT} (winner ${total(ranked[0])}/25)`);
