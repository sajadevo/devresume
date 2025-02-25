// @components
import { Badge } from "@/components/ui/badge";

// @utils
import { cn } from "@/lib/utils";

export function LeaderboardBadge({
  type,
  value,
  label,
  emoji,
  isActive,
  className,
  ...props
}: {
  type: "commit" | "pr" | "issue" | "review" | "star";
  value?: number;
  label: string;
  emoji: string;
  isActive?: boolean;
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <Badge
      {...props}
      className={cn(
        "cursor-pointer",
        {
          "bg-emerald-600/10 text-emerald-950": type === "commit",
          "bg-emerald-600 text-white": type === "commit" && isActive,
          "bg-blue-600/10 text-blue-950": type === "pr",
          "bg-blue-600 text-white": type === "pr" && isActive,
          "bg-orange-400/10 text-orange-950": type === "issue",
          "bg-orange-400 text-white": type === "issue" && isActive,
          "bg-indigo-600/10 text-indigo-950": type === "review",
          "bg-indigo-600 text-white": type === "review" && isActive,
          "bg-black/10 text-black": type === "star",
          "bg-black text-white": type === "star" && isActive,
        },
        className
      )}
    >
      {emoji}&nbsp;
      {value && (
        <>
          &nbsp;
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(value)}
        </>
      )}
      &nbsp;{label}
      {value && value > 1 ? "s" : ""}
    </Badge>
  );
}
