import { Shield, Backpack, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TranslationKey } from "../translations";

import rafting1 from "@assets/rafting_1778693481901.jpeg";
import rafting2 from "@assets/rafting_2_1778693481892.jpeg";
import rafting3 from "@assets/rafting_3_1778693481900.jpeg";

export type GuideArticle = {
  slug: "safety" | "what-to-pack" | "2026-season";
  img: string;
  icon: LucideIcon;
  tagKey: TranslationKey;
  titleKey: TranslationKey;
  leadKey: TranslationKey;
  bodyKeys: TranslationKey[];
};

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: "safety",
    img: rafting1,
    icon: Shield,
    tagKey: "guide.a1.tag",
    titleKey: "guide.a1.title",
    leadKey: "guide.a1.lead",
    bodyKeys: ["guide.a1.p1", "guide.a1.p2", "guide.a1.p3"],
  },
  {
    slug: "what-to-pack",
    img: rafting2,
    icon: Backpack,
    tagKey: "guide.a2.tag",
    titleKey: "guide.a2.title",
    leadKey: "guide.a2.lead",
    bodyKeys: ["guide.a2.p1", "guide.a2.p2", "guide.a2.p3"],
  },
  {
    slug: "2026-season",
    img: rafting3,
    icon: CalendarDays,
    tagKey: "guide.a3.tag",
    titleKey: "guide.a3.title",
    leadKey: "guide.a3.lead",
    bodyKeys: ["guide.a3.p1", "guide.a3.p2", "guide.a3.p3"],
  },
];

export function getArticleBySlug(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((a) => a.slug === slug);
}
