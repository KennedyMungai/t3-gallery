import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const TopNav = async () => {
  const user = await currentUser();

  return (
    <nav className="mb-4 flex h-24 w-full items-center justify-between border-b p-4 text-2xl font-semibold shadow-sm">
      <Link href="/">
        <div>Gallery</div>
      </Link>

      <div className="flex items-center justify-center gap-4">
        <ClerkLoading>
          <Loader2Icon className="size-8 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <span className="text-xl font-semibold">{user?.fullName}</span>
          <UserButton />
        </ClerkLoaded>
        {/* This is basically useless */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
