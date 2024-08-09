"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({ children }: Props) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

const PostHogAuthWrapper = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
      });
    } else if (auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, userInfo]);

  return children;
};