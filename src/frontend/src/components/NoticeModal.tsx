import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Category, CreateNoticeRequest, Notice } from "../types";
import { CATEGORY_LABELS } from "../types";

export type NoticeFormData = {
  title: string;
  category: Category;
  description: string;
  fileUrl: string;
  date: string;
};

interface NoticeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NoticeFormData) => Promise<void>;
  notice?: Notice | null;
  loading?: boolean;
}

const CATEGORIES: Category[] = ["academic", "event", "sports", "general"];

export function NoticeModal({
  open,
  onClose,
  onSubmit,
  notice,
  loading = false,
}: NoticeModalProps) {
  const isEditing = !!notice;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormData>({
    defaultValues: {
      title: "",
      category: "academic",
      description: "",
      fileUrl: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedCategory = watch("category");

  // Populate form when editing
  useEffect(() => {
    if (open) {
      if (notice) {
        reset({
          title: notice.title,
          category: notice.category,
          description: notice.description,
          fileUrl: notice.fileUrl,
          date: notice.date,
        });
      } else {
        reset({
          title: "",
          category: "academic",
          description: "",
          fileUrl: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    }
  }, [open, notice, reset]);

  const handleFormSubmit = async (data: NoticeFormData) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-lg bg-card border-border shadow-xl"
        data-ocid="notice.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-foreground">
            {isEditing ? "Edit Notice" : "Create New Notice"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 py-2"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <Label
              htmlFor="notice-title"
              className="text-sm font-medium text-foreground"
            >
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="notice-title"
              placeholder="Enter notice title"
              className="bg-input border-border focus:ring-primary"
              data-ocid="notice.title.input"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
            {errors.title && (
              <p
                className="text-xs text-destructive"
                data-ocid="notice.title.field_error"
              >
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={(val) => setValue("category", val as Category)}
            >
              <SelectTrigger
                className="bg-input border-border"
                data-ocid="notice.category.select"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="notice-desc"
              className="text-sm font-medium text-foreground"
            >
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="notice-desc"
              placeholder="Enter notice description"
              rows={4}
              className="bg-input border-border focus:ring-primary resize-none"
              data-ocid="notice.description.textarea"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && (
              <p
                className="text-xs text-destructive"
                data-ocid="notice.description.field_error"
              >
                {errors.description.message}
              </p>
            )}
          </div>

          {/* File URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="notice-file"
              className="text-sm font-medium text-foreground"
            >
              File URL{" "}
              <span className="text-muted-foreground text-xs font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="notice-file"
              placeholder="https://example.com/document.pdf"
              className="bg-input border-border focus:ring-primary"
              data-ocid="notice.fileurl.input"
              {...register("fileUrl", {
                pattern: {
                  value: /^(https?:\/\/.+)?$/,
                  message: "Must be a valid URL",
                },
              })}
            />
            {errors.fileUrl && (
              <p
                className="text-xs text-destructive"
                data-ocid="notice.fileurl.field_error"
              >
                {errors.fileUrl.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label
              htmlFor="notice-date"
              className="text-sm font-medium text-foreground"
            >
              Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="notice-date"
              type="date"
              className="bg-input border-border focus:ring-primary"
              data-ocid="notice.date.input"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p
                className="text-xs text-destructive"
                data-ocid="notice.date.field_error"
              >
                {errors.date.message}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting || loading}
              data-ocid="notice.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="gradient-primary text-primary-foreground font-semibold"
              data-ocid="notice.submit_button"
            >
              {isSubmitting || loading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                  : "Create Notice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
