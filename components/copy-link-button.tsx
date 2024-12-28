"use client";

import React from "react";

// @components
import { Button } from "@/components/ui/button";

// @icons
import { RiCheckboxCircleFill } from "@remixicon/react";

// @utils
import { cn } from "@/lib/utils";

export function CopyLinkButton({ username }: { username: string }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const link = `${process.env.NEXT_PUBLIC_PROD_URL}/${username}`;

  return (
    <Button
      variant="secondary"
      className={cn("w-full cursor-pointer", {
        "bg-green-500/10 ring-green-500/30": isCopied,
      })}
      onClick={() => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }}
    >
      {isCopied ? (
        <RiCheckboxCircleFill className="size-5 text-green-600" />
      ) : (
        "Copy Profile Link"
      )}
    </Button>
  );
}
