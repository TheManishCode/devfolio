/**
 * Utility Functions
 * 
 * Pure helper functions with no framework coupling.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS conflict resolution.
 * 
 * Merges multiple class name inputs using clsx for conditional classes,
 * then applies tailwind-merge to resolve conflicting Tailwind utilities.
 * 
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6") // => "py-2 px-6 bg-blue-500"
 * 
 * @param inputs - Class values (strings, objects, arrays, conditionals)
 * @returns Merged class string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
