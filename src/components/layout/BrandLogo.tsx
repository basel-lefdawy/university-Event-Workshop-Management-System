import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

export function GradientIconBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shrink-0 ${className}`}
    >
      <GraduationCap className="text-white" size={24} />
    </div>
  );
}

interface BrandLogoRowProps {
  interactive?: boolean;
  titleClassName?: string;
  subtitle?: ReactNode;
}

export function BrandLogoRow({
  interactive = true,
  titleClassName = "text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent",
  subtitle,
}: BrandLogoRowProps) {
  const inner = (
    <>
      <GradientIconBadge />
      <div className="text-left">
        <span className={`block ${titleClassName}`}>UniEvents</span>
        {subtitle ? <span className="block text-sm">{subtitle}</span> : null}
      </div>
    </>
  );

  if (interactive) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 cursor-pointer"
      >
        {inner}
      </motion.div>
    );
  }

  return <div className="flex items-center gap-2">{inner}</div>;
}
