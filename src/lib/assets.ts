export function publicUrl(path: string): string {
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .join("/");
}

export function isPdfFile(path: string): boolean {
  return path.toLowerCase().endsWith(".pdf");
}
