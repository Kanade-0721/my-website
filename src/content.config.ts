import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  media: z
    .object({
      images: z.array(z.string()).default([]),
      videos: z.array(z.string()).default([]),
      audios: z.array(z.string()).default([]),
    })
    .default({
      images: [],
      videos: [],
      audios: [],
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: contentSchema,
});

const study = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study' }),
  schema: contentSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: contentSchema,
});

export const collections = { blog, study, projects };
