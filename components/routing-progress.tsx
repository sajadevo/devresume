"use client";

// @components
import { AppProgressProvider } from "@bprogress/next";

export function RoutingProgress({ children }: { children: React.ReactNode }) {
  return (
    <AppProgressProvider
      height="3px"
      color="var(--color-primary)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
}
