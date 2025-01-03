"use client";

import React from "react";

// @components
import { Button } from "@/components/ui/button";

// @icons
import {
  RiLoader2Fill,
  RiLoopLeftFill,
  RiCheckboxCircleFill,
} from "@remixicon/react";

// @hooks
import { useRouter } from "next/navigation";

// @actions
import { syncUserProfile } from "@/lib/actions";

export function SyncProfileButton({ username }: { username: string }) {
  const { refresh } = useRouter();
  const [isSynced, setIsSynced] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSyncProjects() {
    setIsSynced(false);
    setIsLoading(true);

    await syncUserProfile(username);

    setIsSynced(true);
    setIsLoading(false);

    setTimeout(() => {
      refresh();
      setIsSynced(false);
    }, 1000);
  }

  return (
    <div className="mt-4">
      <Button
        size="lg"
        className="w-full cursor-pointer"
        disabled={isLoading}
        onClick={handleSyncProjects}
      >
        {isLoading && <RiLoader2Fill className="size-4 animate-spin" />}
        {isSynced && <RiCheckboxCircleFill className="size-4" />}
        {!isLoading && !isSynced && (
          <>
            <RiLoopLeftFill className="size-4" /> Sync with GitHub
          </>
        )}
      </Button>
    </div>
  );
}
