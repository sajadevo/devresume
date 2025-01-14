"use client";

import React from "react";

// @components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// @icons
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiInformationFill,
  RiLoader2Fill,
} from "@remixicon/react";

// @types
import { Profile } from "@/types";

// @actions
import { syncUserProfile } from "@/lib/actions";

export function ProfileImprovementDialog({ profile }: { profile: Profile }) {
  const [isSynced, setIsSynced] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (
      profile.avatar &&
      profile.name &&
      profile.bio &&
      profile.location &&
      profile.email &&
      profile.x &&
      profile.portfolio
    ) {
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, [profile]);

  if (!isVisible) {
    return null;
  }

  async function handleSyncProjects() {
    if (profile.username) {
      setIsSynced(false);
      setIsLoading(true);

      await syncUserProfile(profile.username);

      setIsSynced(true);
      setIsLoading(false);

      setTimeout(() => {
        setIsLoading(false);
        setIsSynced(false);
        setIsVisible(false);
      }, 1000);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="relative cursor-pointer size-8 bg-yellow-500/20 ring-yellow-500/40 text-yellow-700"
              >
                <RiInformationFill className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-60 text-balance">
              Your profile needs some improvements. Click here to learn more.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Improve Your Profile</DialogTitle>
          <DialogDescription>
            We&apos;ve detected some missing information on your GitHub profile,
            by completing those information you can improve both your GitHub and
            DevResume profile.
          </DialogDescription>
        </DialogHeader>
        <ul className="my-2 border border-border border-dashed rounded-lg divide-y divide-border divide-dashed">
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Profile Picture</span>
            <Status isValid={Boolean(profile.avatar)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Name</span>
            <Status isValid={Boolean(profile.name)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Bio</span>
            <Status isValid={Boolean(profile.bio)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Location</span>
            <Status isValid={Boolean(profile.location)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Email</span>
            <Status isValid={Boolean(profile.email)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>X/Twitter</span>
            <Status isValid={Boolean(profile.x)} isLoading={isLoading} />
          </li>
          <li className="flex items-center gap-4 justify-between text-black text-base px-3 py-2">
            <span>Portfolio</span>
            <Status
              isValid={Boolean(profile.portfolio)}
              isLoading={isLoading}
            />
          </li>
        </ul>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-lg cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={handleSyncProjects}
            className="rounded-lg cursor-pointer w-38.5"
          >
            {isLoading && <RiLoader2Fill className="size-4 animate-spin" />}
            {isSynced && <RiCheckboxCircleFill className="size-4" />}
            {!isLoading && !isSynced && "Sync with GitHub"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Status({
  isValid,
  isLoading,
}: {
  isValid: boolean;
  isLoading: boolean;
}) {
  if (isValid) {
    return <RiCheckboxCircleFill className="size-5 text-green-600" />;
  }

  return isLoading ? (
    <RiLoader2Fill className="size-5 text-black animate-spin" />
  ) : (
    <RiCloseCircleFill className="size-5 text-destructive" />
  );
}
