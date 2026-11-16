export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border border-line border-t-fg" />
    </div>
  );
}
