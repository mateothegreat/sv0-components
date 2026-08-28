/**
 * Icon shape.
 *
 * @category Icons
 */
export type Icon = {
  label: string;
  type: "file" | "folder";
  extensions: readonly RegExp[];
  states: Record<string, string>;
};

/**
 * Supported file types mapping their icon states.
 *
 * @category Icons
 */
export const ICONS = {
  typescript: {
    label: "TypeScript File",
    type: "file",
    extensions: [/\.ts$/, /\.tsx$/],
    states: {
      default: "vscode-icons:file-type-typescript-official"
    }
  },
  javascript: {
    label: "JavaScript File",
    type: "file",
    extensions: [/\.js$/, /\.jsx$/],
    states: {
      default: "vscode-icons:file-type-js-official"
    }
  },
  css: {
    label: "CSS File",
    type: "file",
    extensions: [/\.css$/],
    states: {
      default: "material-symbols:css"
    }
  },
  html: {
    label: "HTML File",
    type: "file",
    extensions: [/\.html$/],
    states: {
      default: "skill-icons:html"
    }
  },
  json: {
    label: "JSON File",
    type: "file",
    extensions: [/\.json$/],
    states: {
      default: "devicon:npm-wordmark"
    }
  },
  markdown: {
    label: "Markdown File",
    type: "file",
    extensions: [/\.md$/],
    states: {
      default: "fa6-brands:markdown"
    }
  },
  svelte: {
    label: "Svelte File",
    type: "file",
    extensions: [/\.svelte$/],
    states: {
      default: "logos:svelte-icon"
    }
  },
  folder: {
    label: "Folder/Package",
    type: "folder",
    extensions: [/.*/],
    states: {
      true: "lucide:folder-open",
      false: "lucide:folder-closed"
    }
  },
  default: {
    label: "File",
    type: "file",
    extensions: [/.*/],
    states: {
      file: "vscode-icons:default-file",
      unknown: "vscode-icons:default-file"
    }
  }
} as const satisfies Record<string, Icon>;

/**
 * Get an icon by {FileItem} using the filename/path and requested state.
 *
 * @param file - The {FileItem} to get the icon for.
 *
 * @returns The icon name.
 *
 * @category Icons
 */
export const getIconByFile = (file: string, state: string): string => {
  for (const t of Object.values(ICONS)) {
    if (t.extensions.some((ext) => ext.test(file))) {
      const iconState = t.states[state as keyof typeof t.states];
      if (iconState) {
        return iconState;
      }
      // Fallback to default state if it exists
      if ("default" in t.states) {
        return t.states.default;
      }
      // If no default state, return the first available state
      return Object.values(t.states)[0];
    }
  }

  throw new Error(`icon "${file}" with state "${state}" is not found`);
};

/**
 * Retrieves all icon names from the ICONS variable for preloading purposes.
 *
 * This function simply flattens the nested structure of the icons variable and their states into a single array of icon name strings that
 * can be passed directly to icon loading utilities.
 *
 * @returns An array of icon name strings from all icon states.
 *
 * @example
 *
 * ```ts
 * // Preload all icons at application startup
 * await loadIconifyIcons(getIconNames()); // ['logos:svelte-icon', 'lucide:folder-open', 'lucide:folder-closed', ...]
 * ```
 *
 * @category Icons
 */
export const getIconNames = (): string[] => {
  return Object.values(ICONS).flatMap((icon) => Object.values(icon.states));
};
