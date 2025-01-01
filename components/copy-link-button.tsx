"use client";

import React from "react";

// @components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// @icons
import { RiCheckboxCircleFill, RiLink } from "@remixicon/react";

// @utils
import { cn } from "@/lib/utils";

export function CopyLinkButton({ username }: { username: string }) {
  const [isCopied, setIsCopied] = React.useState(false);
  const link = `${process.env.NEXT_PUBLIC_PROD_URL}/${username}`;

  function copyLink() {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            onClick={copyLink}
            className={cn("w-full cursor-pointer", {
              "bg-green-500/10 ring-green-500/30": isCopied,
            })}
          >
            {isCopied ? (
              <RiCheckboxCircleFill className="size-5 text-green-600" />
            ) : (
              <RiLink className="size-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Copy Profile Link</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
