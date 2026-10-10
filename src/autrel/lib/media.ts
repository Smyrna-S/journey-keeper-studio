import type { Destination } from "../types";

const regionalImages: Record<string, string> = {
  "N04": "/__l5e/assets-v1/091f4591-1eac-4055-a3e1-7843708dfb3e/valparai_panorama.jpg",
  "A04": "/__l5e/assets-v1/9109dc52-7823-476e-851a-a24fd911b0f3/valparai_mountains.jpg",
  "N02": "/__l5e/assets-v1/19de2ac8-e9c7-4cfd-bfc1-56bf1289edbf/kolli_hills.jpg",
  "A02": "/__l5e/assets-v1/19de2ac8-e9c7-4cfd-bfc1-56bf1289edbf/kolli_hills.jpg",
  "N03": "/__l5e/assets-v1/2380a60b-45e7-4b5f-9d11-2154999eb408/meghamalai.jpg"
};
export const coverImage = "/__l5e/assets-v1/091f4591-1eac-4055-a3e1-7843708dfb3e/valparai_panorama.jpg";
export function destinationImage(d: Destination) { return regionalImages[d.id] || d.image; }