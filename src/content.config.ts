import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const mediaSchema = z
  .object({
    images: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]),
    audios: z.array(z.string()).default([]),
  })
  .default({
    images: [],
    videos: [],
    audios: [],
  });

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  published: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  media: mediaSchema,
});

const sectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  order: z.preprocess((value) => (value === '' ? undefined : value), z.coerce.number().optional()),
  published: z.boolean().default(true),
  cover: z.string().optional(),
});

const projectSectionSchema = sectionSchema.extend({
  technologies: z.array(z.string()).default([]),
  status: z.enum(['进行中', '暂停', '完成']).default('进行中'),
});

const sectionedContentSchema = contentSchema.extend({
  section: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: contentSchema,
});

const studySections = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study-sections' }),
  schema: sectionSchema,
});

const study = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study' }),
  schema: sectionedContentSchema,
});

const projectSections = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/project-sections' }),
  schema: projectSectionSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: sectionedContentSchema,
});

export const collections = { blog, studySections, study, projectSections, projects };
