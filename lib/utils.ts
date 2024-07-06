import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { QueryClient } from "@tanstack/react-query"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})