"use client";

import React from "react";

// @components
import { Button } from "@/components/ui/button";

// @icons
import {
  RiLoader2Fill,
  RiLoopLeftFill,
  RiAlarmWarningFill,
  RiCheckboxCircleFill,
} from "@remixicon/react";

// @hooks
import { useRouter } from "next/navigation";

// @utils
import { cn } from "@/lib/utils";

// @actions
import { syncUserProject } from "@/lib/actions";

export function SyncProjectsButton({ username }: { username: string }) {
  const { refresh } = useRouter();
  const [isSynced, setIsSynced] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSyncProjects() {
    setIsSynced(false);
    setIsLoading(true);

    const result = await syncUserProject(username);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsSynced(true);
    setIsLoading(false);

    setTimeout(() => {
      refresh();
    }, 1000);
  }

  return (
    <div className="mt-6">
      <Button
        size="sm"
        variant="secondary"
        className={cn("w-33.5 cursor-pointer", {
          "pointer-events-none bg-green-500/10 ring-green-500/30": isSynced,
        })}
        disabled={isLoading}
        onClick={handleSyncProjects}
      >
        {isLoading && <RiLoader2Fill className="size-4 animate-spin" />}
        {isSynced && <RiCheckboxCircleFill className="size-4 text-green-600" />}
        {!isLoading && !isSynced && (
          <>
            <RiLoopLeftFill className="size-3.5" /> Sync Projects
          </>
        )}
      </Button>
      {error && (
        <p className="text-sm flex gap-2 justify-center text-center items-baseline mt-4">
          <RiAlarmWarningFill className="size-4 shrink-0 translate-y-px text-destructive" />
          {error}
        </p>
      )}
    </div>
  );
}
