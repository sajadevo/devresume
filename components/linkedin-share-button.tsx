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
import { RiLinkedinBoxFill } from "@remixicon/react";

// @utils
import { createLinkedinLink } from "@/lib/utils";

export function LinkedinShareButton({ username }: { username: string }) {
  const link = createLinkedinLink(username);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={link} target="_blank">
              <RiLinkedinBoxFill className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Share on LinkedIn</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
