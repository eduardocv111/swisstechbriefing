import { z } from "zod";

export const articleSchema = z.object({
    slug: z.string().min(1).trim().regex(/^[a-z0-9-]+$/, "Slug invalid format (lowered alphanumeric and hyphens only)"),
    title: z.string().min(3).max(150).trim(),
    excerpt: z.string().min(10).max(500).trim(),
    contentHtml: z.string().min(20).trim(),
    category: z.string().min(1).trim(),
    date: z.coerce.date(), // Robust handling of ISO strings or date objects
    author: z.object({
        name: z.string().min(1).trim(),
        role: z.string().optional().nullable(),
    }),
    imageUrl: z.string().url().or(z.literal("")).optional().nullable(),
    sources: z.array(z.object({
        name: z.string().min(1).trim(),
        url: z.string().url().trim(),
    })).min(1),
});

export type ArticleInput = z.infer<typeof articleSchema>;
