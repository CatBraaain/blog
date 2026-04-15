import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { Component } from "svelte";
import { z } from "zod";
import { CATEGORY_KINDS, TAG_KINDS } from "./config";

export const postModules = Object.values(
  import.meta.glob("$content/**/index.md", { eager: true }),
) as {
  default: Component;
  meta: PostMeta;
}[];

export const postMetas = (
  Object.values(
    import.meta.glob("$content/**/index.md", { eager: true, import: "meta" }),
  ) as PostMeta[]
).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

dayjs.extend(utc);
dayjs.extend(timezone);

export const postMetaSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum(CATEGORY_KINDS),
    tags: z.array(z.enum(TAG_KINDS)).default([]),
    image: z.string().optional(),
    createdAt: z.date().overwrite((d) => dayjs.utc(d).tz("Asia/Tokyo", true).toDate()),
    updatedAt: z.date().overwrite((d) => dayjs.utc(d).tz("Asia/Tokyo", true).toDate()),
    noteLink: z.url().optional(),
    isDraft: z.boolean().default(false),
  })
  .strict()
  .transform((data) => ({
    ...data,
    slug: dayjs(data.createdAt).tz("Asia/Tokyo").format("YYYYMMDDHHmmss"),
  }))
  .refine((e) => e.updatedAt >= e.createdAt, {
    error: "updatedAt must be greater than or equal to createdAt",
    path: ["updatedAt"],
  });

export type PostMeta = z.infer<typeof postMetaSchema>;
