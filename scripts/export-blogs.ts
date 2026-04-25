/**
 * Exports all 6 EN blog posts to a single Markdown document that can be
 * read on GitHub or pasted into the admin form field-by-field.
 *
 * Run: npx tsx scripts/export-blogs.ts
 */
import { writeFileSync } from 'node:fs';
import { BLOG_POSTS } from './blog-content';

const lines: string[] = [];

lines.push('# BidayaLab — 6 blog posts to add manually\n');
lines.push(
  'Each post below corresponds to one row in the `blogs` collection. ' +
    'Copy each field into the matching field of your admin form.\n',
);
lines.push('---\n');

BLOG_POSTS.forEach((p, i) => {
  lines.push(`## ${i + 1}. ${p.title}\n`);
  lines.push(`**Slug:** \`${p.slug}\``);
  lines.push(`**Category:** \`${p.category}\``);
  lines.push(`**Language:** \`${p.lang}\``);
  lines.push(`**Author:** ${p.authorName}`);
  lines.push(`**Reading time:** ${p.readingTime} min`);
  lines.push(`**Publication date:** ${p.publicationDate}`);
  lines.push(`**Image URL:** ${p.image}`);
  lines.push(`**Alternate slug (FR):** \`${p.alternateSlug}\``);
  lines.push('');
  lines.push('### Excerpt');
  lines.push('```');
  lines.push(p.excerpt);
  lines.push('```');
  lines.push('');
  lines.push('### Body (paste into the `text` / HTML editor field)');
  lines.push('```html');
  lines.push(p.text.trim());
  lines.push('```');
  lines.push('');
  lines.push('### FAQ (5 Q&A pairs)');
  p.faq.forEach((f, fi) => {
    lines.push(`${fi + 1}. **Q:** ${f.q}`);
    lines.push(`   **A:** ${f.a}`);
  });
  lines.push('');
  lines.push('---\n');
});

const out = '/home/ubuntu/bidayalab-blog-posts.md';
writeFileSync(out, lines.join('\n'), 'utf-8');
console.log(`Wrote ${out} (${BLOG_POSTS.length} posts).`);
