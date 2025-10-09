export function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, "and") // ✅ Replace & with "and"
    .normalize("NFD") // Normalize accented characters (é -> e)
    .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars except spaces & hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Merge multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}
