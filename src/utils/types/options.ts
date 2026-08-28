export const Size = {
  xs: {
    label: "Extra Small (XS)",
    value: "xs"
  },
  sm: {
    label: "Small (SM)",
    value: "sm"
  },
  md: {
    label: "Medium (MD)",
    value: "md"
  },
  lg: {
    label: "Large (LG)",
    value: "lg"
  }
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const Intent = {
  info: {
    label: "Info",
    value: "info"
  },
  success: {
    label: "Success",
    value: "success"
  },
  warning: {
    label: "Warning",
    value: "warning"
  },
  error: {
    label: "Error",
    value: "error"
  },
  note: {
    label: "Note",
    value: "note"
  },
  tip: {
    label: "Tip",
    value: "tip"
  }
} as const;

export type Intent = (typeof Intent)[keyof typeof Intent];
