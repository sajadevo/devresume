"use client";

import React from "react";

// @components
import { LeaderboardBadge } from "@/components/leaderboard-badge";

// @hooks
import { useRouter } from "next/navigation";

export function LeaderboardHeader({ sort }: { sort: string }) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [optimisticSort, setOptimisticSort] = React.useOptimistic(sort);

  function handleSort(type: string) {
    startTransition(() => {
      setOptimisticSort(type);
      router.push(`?sort=${type}`);
    });
  }

  return (
    <div
      data-pending={isPending ? true : undefined}
      className="px-6 py-5 border border-border rounded-2xl mb-4 flex items-center justify-between"
    >
      <h1 className="font-semibold text-black text-lg leading-none">
        Leaderboard
      </h1>
      <div className="flex items-center gap-4">
        <div className="font-semibold text-black leading-none text-sm">
          Sorted by:
        </div>
        <div className="flex items-center gap-2">
          <LeaderboardBadge
            type="commit"
            emoji="📝"
            label="Commits"
            isActive={optimisticSort === "commits"}
            onClick={() => handleSort("commits")}
          />
          <LeaderboardBadge
            type="pr"
            emoji="🚀"
            label="PRs"
            isActive={optimisticSort === "prs"}
            onClick={() => handleSort("prs")}
          />
          <LeaderboardBadge
            type="issue"
            emoji="⚠️"
            label="Issues"
            isActive={optimisticSort === "issues"}
            onClick={() => handleSort("issues")}
          />
          <LeaderboardBadge
            type="review"
            emoji="✅"
            label="Reviews"
            isActive={optimisticSort === "reviews"}
            onClick={() => handleSort("reviews")}
          />
          <LeaderboardBadge
            type="star"
            emoji="⭐"
            label="Stars"
            isActive={optimisticSort === "stars"}
            onClick={() => handleSort("stars")}
          />
        </div>
      </div>
    </div>
  );
}
