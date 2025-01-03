"use client";

import React from "react";

// @components
import { Button } from "@/components/ui/button";

// @icons
import { RiGithubFill, RiLogoutCircleFill } from "@remixicon/react";

// @actions
import { signInWithGithub, signOut } from "@/lib/actions";

export function GithubAuth({ isAuthenticated }: { isAuthenticated: boolean }) {
  async function handleAuth() {
    if (isAuthenticated) {
      await signOut();
    } else {
      await signInWithGithub();
    }
  }

  return isAuthenticated ? (
    <Button
      size="lg"
      variant="github"
      onClick={handleAuth}
      className="w-full cursor-pointer"
    >
      <RiLogoutCircleFill className="size-4" /> Disconnect your GitHub
    </Button>
  ) : (
    <Button
      size="lg"
      variant="github"
      onClick={handleAuth}
      className="w-full cursor-pointer"
    >
      <RiGithubFill className="size-4" /> Connect your GitHub
    </Button>
  );
}
