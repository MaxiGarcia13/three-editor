let clipIdCounter = 0;

/** Unique library entry id (suffix appended by toEntry). */
export function nextClipId(): string {
  return `clip-${clipIdCounter++}`;
}
