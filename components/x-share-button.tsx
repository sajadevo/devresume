"use client";

import React from "react";

// @components
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// @icons
import { RiTwitterXFill } from "@remixicon/react";

// @utils
import { createTweetLink } from "@/lib/utils";

export function XShareButton({ username }: { username: string }) {
  const link = createTweetLink(username);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={link} target="_blank">
              <RiTwitterXFill className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Share on X/Twitter</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
