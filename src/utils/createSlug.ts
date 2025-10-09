export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normalize accented characters (é -> e)
    .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with hyphen
    .replace(/-+/g, "-") // Merge multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}
