// src/components/ui/loader.tsx
export function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
    </div>
  );
}
