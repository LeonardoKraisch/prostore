import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlaneObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function formatNumberWithDecimalPlaces(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return int + "." + (decimal ? decimal.slice(0, 2) : "00");
}
