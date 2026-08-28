export const ShareVisibility = {
  PUBLIC: "public",
  PRIVATE: "private"
} as const;
export type ShareVisibility = (typeof ShareVisibility)[keyof typeof ShareVisibility];

export interface ShareProps {
  data: Share;
  opened?: (isOpen: boolean) => void;
  complete?: (options: Share) => void;
  open?: boolean;
}

export interface Share {
  visibility: ShareVisibility;
  password?: string;
  url?: string;
  title?: string;
}

export interface ShareDialogProps {
  data: Share;
  opened?: (isOpen: boolean) => void;
  complete?: (options: Share) => void;
}

export interface ShareContentProps {
  options: Share;
  onOptionsChange: (options: Share) => void;
  onCopy: () => void;
  copySuccess?: boolean;
}

export interface ShareToggleProps {
  isPublic: boolean;
  onToggle: (isPublic: boolean) => void;
}
