#!/usr/bin/env node
/**
 * Scaffold a new blog post.
 *
 * Usage:
 *   node scripts/new-post.js "My Post Title"
 *   node scripts/new-post.js "My Post Title" --draft
 *
 * Creates src/content/blog/my-post-title.mdx with frontmatter pre-filled.
 */

import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const args = process.argv.slice(2);
const draft = args.includes('--draft');
const titleArg = args.filter((a) => !a.startsWith('--'));

if (titleArg.length === 0) {
  console.error('Usage: node scripts/new-post.js "Post Title" [--draft]');
  process.exit(1);
}

const title = titleArg.join(' ');
const slug = slugify(title);
const filePath = resolve(__dirname, `../src/content/blog/${slug}.mdx`);

if (existsSync(filePath)) {
  console.error(`❌ Already exists: ${filePath}`);
  process.exit(1);
}

const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: ""
pubDate: ${today()}${draft ? '\ndraft: true' : ''}
tags: []
---

Write your post here.
`;

writeFileSync(filePath, frontmatter, 'utf-8');
console.log(`✅ Created ${filePath}`);
