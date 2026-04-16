import { CATEGORY_LABELS } from "../types";
import type { Category } from "../types";

interface CategoryTagProps {
  category: Category;
  className?: string;
}

const tagClass: Record<Category, string> = {
  academic: "tag-academic",
  event: "tag-event",
  sports: "tag-sports",
  general: "tag-general",
};

export function CategoryTag({ category, className = "" }: CategoryTagProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tagClass[category]} ${className}`}
      data-ocid={`category.tag.${category}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
