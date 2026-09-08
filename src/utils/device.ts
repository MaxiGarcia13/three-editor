export function isMobileViewport(): boolean {
  return matchMedia('(max-width: 640px)').matches;
}
