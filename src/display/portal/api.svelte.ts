import { mount, unmount, type Component, type MountOptions } from "svelte";
import { SvelteMap } from "svelte/reactivity";

export interface PortalConfig<T extends Record<string, any> = any> {
  component: Component<T>;
  props?: T;
  target?: HTMLElement | string;
  anchor?: HTMLElement;
  intro?: boolean;
}

export interface PortalInstance<T extends Record<string, any> = any> {
  id: string;
  component: Component<T>;
  target: HTMLElement;
  props?: T;
  destroy: () => void;
  disposed: boolean;
  ref: ReturnType<typeof mount>;
}

class PortalManager {
  portals = $state<SvelteMap<string, PortalInstance>>(new SvelteMap());

  // constructor() {
  //   $effect(() => {
  //     console.log("portals", this.portals);
  //   });
  // }

  /**
   * Creates and mounts a new portal instance
   *
   * @param config Portal configuration
   *
   * @returns Portal ID for future reference
   */
  render<T extends Record<string, any>>(config: PortalConfig<T>): PortalInstance<T> {
    const id = `portal-${this.portals.size + 1}`;
    const targetElement = this.resolveTarget(config.target)!;

    const baseOptions = {
      target: targetElement,
      anchor: config.anchor,
      intro: config.intro ?? true
    };

    // Create destroy handler that safely unmounts
    const destroy = () => {
      this.unmount(id);
    };

    const ref = mount(
      config.component,
      (config.props !== undefined
        ? {
            ...baseOptions,
            props: {
              id,
              destroy,
              ...config.props
            }
          }
        : baseOptions) as MountOptions<T>
    );

    const instance: PortalInstance<T> = {
      id,
      component: config.component,
      target: targetElement,
      props: config.props,
      destroy,
      disposed: false,
      ref
    };

    this.portals.set(id, instance);
    return instance;
  }

  unmount(instance: PortalInstance | string): boolean {
    let portal: PortalInstance | undefined;
    let id: string;

    if (typeof instance === "string") {
      id = instance;
      portal = this.portals.get(instance);
    } else {
      id = instance.id;
      portal = instance;
    }

    if (!portal) {
      throw new Error(`portal not found: ${id}`);
    }

    try {
      this.portals.delete(id);
      unmount(portal.ref);
      return true;
    } catch (error) {
      console.error("Failed to unmount portal:", error);
      return false;
    }
  }

  /**
   * Unmounts all active portals
   */
  unmountAll(): void {
    Array.from(this.portals.keys()).forEach((id) => this.unmount(id));
  }

  /**
   * Gets a portal instance by ID
   */
  getPortal(id: string): PortalInstance | undefined {
    return this.portals.get(id);
  }

  /**
   * Checks if a portal exists
   */
  hasPortal(id: string): boolean {
    return this.portals.has(id);
  }

  /**
   * Resolves target element from selector or element
   */
  private resolveTarget(target?: HTMLElement | string): HTMLElement | null {
    if (!target) {
      // Default to body
      return document.body;
    }

    if (typeof target === "string") {
      return document.querySelector(target);
    }

    return target;
  }

  /**
   * Creates a portal container element
   */
  createContainer(className?: string): HTMLElement {
    if (typeof window === "undefined") {
      throw new Error("Cannot create container in SSR environment");
    }

    const container = document.createElement("div");
    container.className = className || "portal-container";
    document.body.appendChild(container);
    return container;
  }

  /**
   * Removes a portal container element
   */
  removeContainer(container: HTMLElement): void {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
}

// Export singleton instance
export const portalManager = new PortalManager();

// Export factory for creating isolated instances
export function createPortalManager(): PortalManager {
  return new PortalManager();
}
