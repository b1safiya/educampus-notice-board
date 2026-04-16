import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import type { Notice } from "../types";
import { CategoryTag } from "./CategoryTag";

interface NoticeCardProps {
  notice: Notice;
  index: number;
  isAdmin?: boolean;
  onEdit?: (notice: Notice) => void;
  onDelete?: (notice: Notice) => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NoticeCard({
  notice,
  index,
  isAdmin = false,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  return (
    <Card
      className="group relative overflow-hidden border border-border bg-card shadow-card
        hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-out
        animate-fade-in"
      style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "both" }}
      data-ocid={`notice.card.${index + 1}`}
    >
      {/* Subtle gradient accent top bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-5">
        {/* Header: title + actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2 flex-1">
            {notice.title}
          </h3>
          {isAdmin && (
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => onEdit?.(notice)}
                aria-label="Edit notice"
                data-ocid={`notice.edit_button.${index + 1}`}
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete?.(notice)}
                aria-label="Delete notice"
                data-ocid={`notice.delete_button.${index + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {notice.description}
        </p>

        {/* Footer: tag + date + file link */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <CategoryTag category={notice.category} />
            <span className="text-xs text-muted-foreground">
              {formatDate(notice.date)}
            </span>
          </div>
          {notice.fileUrl && (
            <a
              href={notice.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline shrink-0"
              data-ocid={`notice.file_link.${index + 1}`}
              aria-label="Open attached file"
            >
              <ExternalLink className="w-3 h-3" />
              File
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
