import { cn } from "@/utils/helpers";

export function Logo({ className = "" }) {
    return (
        <img
            className={cn(
                "h-9 object-cover text-center text-xs text-text-tertiary",
                className,
            )}
            src="/images/logo.webp"
            alt="Zephyr Logo"
        />
    );
}
