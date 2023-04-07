export interface Note {
  readonly id: string;
  readonly title: string;
  readonly text?: string;
  readonly tags?: string | undefined;
}
