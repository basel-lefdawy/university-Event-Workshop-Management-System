import { GRID_PATTERN_WHITE } from "@/constants/patterns";

interface DecorativeGridProps {
  className?: string;
  opacityClass?: string;
}

export function DecorativeGrid({
  className = "",
  opacityClass = "opacity-20",
}: DecorativeGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${opacityClass} ${className}`}
      style={{ backgroundImage: GRID_PATTERN_WHITE }}
      aria-hidden
    />
  );
}
