/**
 * @file
 *
 *   This module provides a Svelte 5 attachment for controlling video playback based on
 *   mouse interactions.
 *
 *   This attachment enables automatic video pause/play functionality when a user's mouse
 *   enters or leaves a specified element. It provides a clean, declarative way to control
 *   video playback without manually managing event listeners or video state in your
 *   components.
 *
 *   ## Capabilities
 *
 *   1. **Mouse Interaction Control:** Automatically pauses video playback when mouse enters
 *        the target element and resumes playback when mouse leaves.
 *   2. **Reference-based Video Control:** Works with video elements passed by reference,
 *        allowing flexible video management across your application or searched for all
 *        children video elements.
 *   3. **Automatic Cleanup:** Handles event listener cleanup when the attachment is destroyed.
 */

import type { Attachment } from "svelte/attachments";

/**
 * Manages video playback control based on mouse interactions with a target element. This
 * class encapsulates all the logic for pausing and playing videos when the user's mouse
 * enters or leaves the associated element, providing clean state management and automatic
 * cleanup of event listeners.
 *
 * @category Video
 */
export class UseVideoControl {
  #video: HTMLVideoElement | null = null;
  #element: HTMLElement | null = null;
  #handleMouseEnter: () => void;
  #handleMouseLeave: () => void;

  /**
   * Creates a new UseVideoControl instance with mouse event handlers. The handlers are
   * bound to the instance to maintain proper context when used as event listeners.
   */
  constructor() {
    this.#handleMouseEnter = this.#onMouseEnter.bind(this);
    this.#handleMouseLeave = this.#onMouseLeave.bind(this);
  }

  /**
   * Sets up the video control attachment on the specified element. This method
   * establishes the connection between the DOM element and the video control logic,
   * adding necessary event listeners for mouse interactions.
   *
   * @param {HTMLElement} element The DOM element that will trigger video control on mouse
   *   interactions.
   *
   * @example
   *
   * ```ts
   * const videoController = new UseVideoControl();
   *
   * videoController.setRef(divElement);
   * videoController.updateVideo(videoElement);
   * ```
   */
  setRef = (element: HTMLElement): void => {
    if (!element) {
      throw new Error("No element provided to UseVideoControl");
    }

    this.#element = element;

    // Add mouse event listeners to control video playback
    this.#element.addEventListener("mouseenter", this.#handleMouseEnter);
    this.#element.addEventListener("mouseleave", this.#handleMouseLeave);
  };

  /**
   * Returns all child video elements of the element that the video control is attached
   * to.
   *
   * @returns {HTMLVideoElement[]} An array of all child video elements.
   */
  getChildrenElements = (): HTMLVideoElement[] => {
    return Array.from(this.#element?.children || []).filter(
      (child) => child instanceof HTMLVideoElement
    ) as HTMLVideoElement[];
  };

  /**
   * Cleans up all event listeners and references when the video control is no longer
   * needed. This method ensures proper memory management by removing all event listeners
   * and clearing references to prevent memory leaks.
   *
   * @example
   *
   * ```ts
   * videoController.destroy();
   * ```
   */
  destroy = (): void => {
    if (this.#element) {
      this.#element.removeEventListener("mouseenter", this.#handleMouseEnter);
      this.#element.removeEventListener("mouseleave", this.#handleMouseLeave);
    }
    this.#element = null;
  };

  /**
   * Handles the mouse enter event by pausing the video if it exists and is currently
   * playing. This private method checks for video availability and current playback state
   * before attempting to pause, preventing errors with null references or already paused
   * videos.
   */
  #onMouseEnter(): void {
    this.getChildrenElements().forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
  }

  /**
   * Handles the mouse leave event by resuming video playback if it exists and is
   * currently paused. This private method checks for video availability and current
   * playback state before attempting to play, ensuring smooth user experience when mouse
   * interactions control video state.
   */
  #onMouseLeave(): void {
    this.getChildrenElements().forEach((video) => {
      if (video.paused) {
        video.play().catch(() => {
          // Silently handle play failures (e.g., user hasn't interacted with page yet).
        });
      }
    });
  }
}

/**
 * Creates a Svelte 5 attachment that controls video playback based on mouse interactions.
 * This factory function provides a declarative way to control video playback when the
 * mouse enters or leaves a target element, automatically handling event listener
 * management and cleanup.
 *
 * @param {UseVideoControl} instance Optional existing UseVideoControl instance to reuse.
 *
 * @returns {Attachment<HTMLElement>} Svelte attachment function for video control
 *   functionality.
 *
 * @example
 *
 * ```ts
 * // In your Svelte component
 * let videoElement: HTMLVideoElement;
 * const videoControlInstance = new UseVideoControl();
 *
 * // Use the attachment with automatic instance creation
 * <div use:videoController>
 *   Hover over me to pause/play the video
 * </div>
 * <video bind:this={videoElement} src="video.mp4" autoplay
 *        onloadeddata={() => videoControlInstance.updateVideo(videoElement)}></video>
 * ```
 *
 * @example
 *
 * ```ts
 * // With reusable instance
 * const videoControlInstance = new UseVideoControl();
 *
 * <div use:videoController={videoControlInstance}>
 *   Video controls area
 * </div>
 * ```
 *
 * @category Attachments
 */
export const videoController = (instance?: UseVideoControl): Attachment<HTMLElement> => {
  return (node: HTMLElement) => {
    if (!instance) {
      instance = new UseVideoControl();
    }

    instance.setRef(node);

    return () => {
      instance?.destroy();
    };
  };
};
