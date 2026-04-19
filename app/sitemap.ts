import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { MOCK_BUILDERS, MOCK_ECOSYSTEMS } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${APP_URL}/builders`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/ecosystems`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${APP_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${APP_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${APP_URL}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${APP_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${APP_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${APP_URL}/data-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const builderRoutes: MetadataRoute.Sitemap = MOCK_BUILDERS.map((b) => ({
    url: `${APP_URL}/builders/${b.handle}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const ecosystemRoutes: MetadataRoute.Sitemap = MOCK_ECOSYSTEMS.map((e) => ({
    url: `${APP_URL}/ecosystems/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...builderRoutes, ...ecosystemRoutes];
}
