import { loadIcons } from "@iconify/svelte";

/**
 * Pre-loads iconify icons for the given icon names.
 *
 * @param icons - The icon names to load.
 * @param debug - Whether to log debug information.
 *
 * @category Icons
 */
export const loadIconifyIcons = (icons: string[], debug?: boolean) => {
  return new Promise((fulfill, reject) => {
    loadIcons(icons, (loaded, missing, pending) => {
      if (pending.length) {
        // Icons are pending, wait for all to load/fail
        //
        // If pending list is not empty, callback will be called
        // again when all icons are either loaded or missing
        return;
      }
      if (missing.length && debug) {
        reject({
          loaded,
          missing
        });
      } else {
        fulfill({
          loaded
        });
      }
    });
  });
};
