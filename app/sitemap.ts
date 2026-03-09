import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const date = new Date();
  return [
    {
      url: 'https://paulyoon.xyz',
      lastModified: date,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://paulyoon.xyz/about',
      lastModified: date,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
