import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '3k3989v2',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-02-19',
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source) => (source ? builder.image(source) : null);

const POST_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  readingTime,
  tags,
  featuredImage,
  "author": author->{ name, image },
  "categories": categories[]->{ _id, title, "slug": slug.current }
`;

export function getAllPosts() {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${POST_CARD_FIELDS} }`
  );
}

export function getLatestPosts(limit = 4) {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit] { ${POST_CARD_FIELDS} }`,
    { limit }
  );
}

export function getPostBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      ${POST_CARD_FIELDS},
      body,
      openGraphImage,
      "authorBio": author->bio
    }`,
    { slug }
  );
}
