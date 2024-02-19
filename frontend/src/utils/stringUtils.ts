export function getInitials(str: string): string {
  const words = str.split(" ");
  const initials = words.map((word) => word.charAt(0));
  return initials.join("");
}
