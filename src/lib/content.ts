import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type SiteCollection = 'blog' | 'study' | 'projects';
export type SectionCollection = 'studySections' | 'projectSections';
export type SectionedCollection = 'study' | 'projects';
export type SiteEntry = CollectionEntry<SiteCollection>;
export type SectionEntry = CollectionEntry<SectionCollection>;
export type SectionedEntry = CollectionEntry<SectionedCollection>;

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

export async function getPublishedSections(collection: SectionCollection) {
  let sections: SectionEntry[] = [];

  try {
    sections = await getCollection(collection, ({ data }) => data.published !== false);
  } catch (error) {
    if (error instanceof Error && /does not exist|empty/i.test(error.message)) {
      return [];
    }

    throw error;
  }

  return sections.sort((a, b) => {
    const orderA = a.data.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.data.order ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) return orderA - orderB;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export async function getEntriesInSection(collection: SectionedCollection, sectionId: string) {
  const entries = await getPublishedEntries(collection);
  return entries.filter((entry) => entry.data.section === sectionId);
}

export function getSectionedEntryPath(collection: SectionedCollection, entry: SectionedEntry) {
  return `/${collection}/${entry.data.section}/${entry.id}`;
}

export function formatEntryDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
