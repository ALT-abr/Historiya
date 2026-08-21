export const PROFILE_AVATARS = [
  { id: "knight", label: "Chevalier", src: "/avatars/knight.png" },
  { id: "crocodile", label: "Crocodile", src: "/avatars/crocodile.png" },
  { id: "princess", label: "Princesse", src: "/avatars/princess.png" },
  { id: "wizard", label: "Magicien", src: "/avatars/wizard.png" },
  { id: "dragon", label: "Dragon", src: "/avatars/dragon.png" },
  { id: "farmer", label: "Fermier", src: "/avatars/farmer.png" },
  { id: "explorer", label: "Explorateur", src: "/avatars/explorer.png" },
  { id: "owl", label: "Hibou", src: "/avatars/owl.png" },
  { id: "knight-selfie", label: "Chevalier selfie", src: "/avatars/knightSelfe.png" },
  { id: "villager", label: "Villageois", src: "/avatars/villager.png" },
] as const;

export const DEFAULT_PROFILE_AVATAR = PROFILE_AVATARS[0].src;

export function isProfileAvatar(value: string): boolean {
  return PROFILE_AVATARS.some((avatar) => avatar.src === value);
}
