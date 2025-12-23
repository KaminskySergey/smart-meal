import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToHslColor(str: string, s = 70, l = 60) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getAvatarDataFromName(name: string) {
  const nameParts = name.trim().split(/\s+/);

  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0][0].toUpperCase();

  const bgColor = stringToHslColor(name);

  return { initials, bgColor };
}

export function getNameFromProduct(name: string) {
  const initial = name.trim().charAt(0).toUpperCase();

  return { initial };
}
