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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// @icons
import { RiLoader2Fill, RiCheckboxCircleFill } from "@remixicon/react";

// @actions
import { deleteProfile } from "@/lib/actions";

export function DeleteProfileDialog({ username }: { username: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);

    if (event.target.value === username) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  }

  async function handleDelete() {
    if (!isConfirmed) return;

    setIsLoading(true);

    await deleteProfile(username);

    setIsDeleted(true);
    setIsLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer w-full">
          Delete Your Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Delete Your Profile</DialogTitle>
          <DialogDescription>
            This action is irreversible, all your data will be deleted
            permanently.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Label
            htmlFor="username"
            className="font-normal text-foreground mb-2 block"
          >
            Enter your username{" "}
            <span className="font-semibold">{username}</span> to continue:
          </Label>
          <Input
            id="username"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="cursor-pointer rounded-lg">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed}
            className="cursor-pointer rounded-lg w-21"
          >
            {isLoading && <RiLoader2Fill className="size-4 animate-spin" />}
            {isDeleted && <RiCheckboxCircleFill className="size-4" />}
            {!isLoading && !isDeleted && "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
