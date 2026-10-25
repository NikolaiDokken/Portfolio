import { getCollection } from "astro:content";

/** All posts, newest first. */
export async function getSortedPosts() {
  const posts = await getCollection("posts");
  return posts.toSorted((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
}

/** Unique tags across all posts, in first-seen order. */
export async function getTags() {
  const posts = await getCollection("posts");
  return [...new Set(posts.flatMap((post) => post.data.tags))];
}

/** Formats a date as YYYY-MM-DD (UTC). */
export const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const postUrl = (id: string) => `/posts/${id}`;
export const tagUrl = (tag: string) => `/tags/${encodeURIComponent(tag)}`;
