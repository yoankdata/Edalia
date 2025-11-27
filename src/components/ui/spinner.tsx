// src/components/ui/spinner.tsx
export function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-[2px] border-muted-foreground border-t-transparent align-middle"
      aria-hidden="true"
    />
  );
}
