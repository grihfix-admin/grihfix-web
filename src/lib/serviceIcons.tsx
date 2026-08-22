// src/lib/serviceIcons.tsx
// Central icon map so every service (including new ones) has a crisp vector icon
// instead of depending on a matching PNG file in /public/icons.
import {
  Armchair,
  Bath,
  Bed,
  CarFront,
  ChefHat,
  Droplets,
  Flame,
  Grid3x3,
  Home,
  LucideIcon,
  Sofa,
  Sparkles,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

export const serviceIconMap = {
  "home-deep-clean": Home,
  "bathroom-deep-clean": Bath,
  "kitchen-deep-clean": ChefHat,
  "sofa-cleaning": Sofa,
  "mattress-cleaning": Bed,
  "chair-cleaning": Armchair,
  "tiles-cleaning": Grid3x3,
  "chimney-cleaning": Flame,
  "terrace-clean": Wind,
  "water-tank": Droplets,
  "car-wash": CarFront,
  "plumbing-visit": Wrench,
  "electrician-visit": Zap,
  "other-maintenance": Sparkles,
} satisfies Record<string, LucideIcon>;

export type ServiceIconId = keyof typeof serviceIconMap;

export function getServiceIcon(id: string): LucideIcon {
  return (serviceIconMap as Record<string, LucideIcon>)[id] ?? Sparkles;
}
