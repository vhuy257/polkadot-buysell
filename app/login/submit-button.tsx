"use client";
import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className={cn(`btn ${props.className} btn-sm text-sm w-full`, {
        "pointer-events-none opacity-60": pending,
      })}
    >
      {isPending && <span className="loading loading-spinner"></span>}
      {isPending ? pendingText : children}
    </button>
  );
}
