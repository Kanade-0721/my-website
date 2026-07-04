import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type SiteCollection = 'blog' | 'study' | 'projects';
export type SiteEntry = CollectionEntry<SiteCollection>;

export async function getPublishedEntries(collection: SiteCollection) {
  let entries: SiteEntry[] = [];

  try {
    entries = await getCollection(collection, ({ data }) => data.published !== false);
  } catch (error) {
    if (error instanceof Error && /does not exist|empty/i.test(error.message)) {
      return [];
    }

    throw error;
  }

  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatEntryDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
