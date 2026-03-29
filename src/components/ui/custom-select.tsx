import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  size?: "sm" | "md";
}

export function CustomSelect({
  value,
  onChange,
  options,
  className,
  size = "md",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "bg-surface-container-highest text-on-surface",
          "rounded-xl border border-transparent",
          "focus:outline-none focus:ring-2 focus:ring-secondary/20",
          "transition-all cursor-pointer",
          open && "ring-2 ring-secondary/20",
          size === "sm" ? "text-sm px-4 py-3" : "px-4 py-3.5",
        )}
      >
        <span className={selected ? "text-on-surface" : "text-on-surface-variant"}>
          {selected?.label ?? "—"}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-on-surface-variant shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl shadow-black/40 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 text-sm text-left",
                "transition-colors",
                opt.value === value
                  ? "text-primary bg-primary/10"
                  : "text-on-surface hover:bg-surface-bright",
              )}
            >
              {opt.label}
              {opt.value === value && (
                <Check className="w-3.5 h-3.5 shrink-0 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
