"use client";

import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="flex h-screen w-screen items-center justify-center rounded-xl bg-neutral-600/50"
      onClose={onDismiss}
    >
      <XCircleIcon
        className="absolute right-4 top-4 h-6 w-6 cursor-pointer text-foreground text-white"
        onClick={onDismiss}
      />
      {children}
      <button onClick={onDismiss} className="close-button" />
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
