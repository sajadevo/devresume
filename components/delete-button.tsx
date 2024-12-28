"use client";

import React from "react";

// @components
import { Button } from "@/components/ui/button";

// @icons
import {
  RiLoader2Fill,
  RiAlarmWarningFill,
  RiCheckboxCircleFill,
} from "@remixicon/react";

// @utils
import { cn } from "@/lib/utils";

// @actions
import { deleteProfile } from "@/lib/actions";

export function DeleteButton({ username }: { username: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);

  async function handleDelete() {
    setIsLoading(true);

    await deleteProfile(username);

    setIsDeleted(true);
    setIsLoading(false);
  }

  return (
    <>
      <Button
        variant="destructive"
        className={cn("w-full cursor-pointer", {
          "pointer-events-none": isDeleted,
        })}
        disabled={isLoading}
        onClick={handleDelete}
      >
        {isLoading && <RiLoader2Fill className="size-5 animate-spin" />}
        {isDeleted && <RiCheckboxCircleFill className="size-5" />}
        {!isLoading && !isDeleted && "Delete Your Profile"}
      </Button>
      <p className="text-sm flex gap-2 items-baseline mt-4">
        <RiAlarmWarningFill className="size-4 shrink-0 translate-y-px text-destructive" />
        This action is irreversible, all your data will be deleted permanently.
      </p>
    </>
  );
}
