import { config, fields, collection } from '@keystatic/core';

export default config({
  // Local mode: reads/writes the MDX files in this repo directly. No GitHub
  // auth, no hosted backend. Edit at /keystatic during `npm run dev`, then
  // commit + push like any other change.
  storage: { kind: 'local' },

  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publish date' }),
        updatedDate: fields.date({ label: 'Updated date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        canonicalURL: fields.url({
          label: 'Canonical URL',
          description: 'Points rel=canonical out to an external original.',
        }),
        content: fields.mdx({
          label: 'Body',
          options: {
            // Images go into src/assets so Astro's optimizer processes them.
            // publicPath uses the @assets alias (tsconfig.json) so the
            // markdown ![](...) Keystatic writes resolves to an import Astro
            // optimizes at build (→ hashed .webp in /_astro). Do NOT point
            // this at public/ — that ships raw, unoptimized files.
            image: {
              directory: 'src/assets/images/blog',
              publicPath: '@assets/images/blog/',
            },
          },
        }),
      },
    }),

    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        kicker: fields.text({ label: 'Kicker' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tech: fields.array(fields.text({ label: 'Tech' }), {
          label: 'Tech',
          itemLabel: (props) => props.value,
        }),
        url: fields.url({ label: 'Live URL' }),
        repo: fields.url({ label: 'Repo URL' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        order: fields.number({ label: 'Order', defaultValue: 0 }),
        year: fields.number({ label: 'Year' }),
        content: fields.mdx({
          label: 'Body',
          options: {
            image: {
              directory: 'src/assets/images/projects',
              publicPath: '@assets/images/projects/',
            },
          },
        }),
      },
    }),
  },
});
