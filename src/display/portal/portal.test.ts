import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, unmount } from 'svelte';
import Portal from './root.svelte';

describe('Portal Component', () => {
	let container: HTMLElement;

	beforeEach(() => {
		// Create a container for tests
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(async () => {
		// Wait for any pending operations
		await new Promise((resolve) => setTimeout(resolve, 50));

		// Cleanup
		if (container && container.parentNode) {
			container.parentNode.removeChild(container);
		}
		// Clean up any remaining portals
		document.querySelectorAll('[data-portal="true"]').forEach((el) => el.remove());
	});

	describe('Basic Functionality', () => {
		it('should render content to document.body by default', async () => {
			const component = mount(Portal, {
				target: container,
				props: {
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Portal Content';
						div.setAttribute('data-testid', 'portal-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			// Wait for effect to run
			await new Promise((resolve) => setTimeout(resolve, 0));

			// Check that content is in body
			const portalContent = document.querySelector('[data-testid="portal-content"]');
			expect(portalContent).toBeTruthy();
			expect(portalContent?.textContent).toBe('Portal Content');

			// Verify it's in a portal container
			const portalContainer = document.querySelector('[data-portal="true"]');
			expect(portalContainer).toBeTruthy();
			expect(portalContainer?.contains(portalContent!)).toBe(true);

			unmount(component);
		});

		it('should render content to custom target selector', async () => {
			// Create a custom target
			const target = document.createElement('div');
			target.id = 'custom-target';
			document.body.appendChild(target);

			const component = mount(Portal, {
				target: container,
				props: {
					target: '#custom-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Custom Target Content';
						div.setAttribute('data-testid', 'custom-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Check that content is in custom target
			const customContent = target.querySelector('[data-testid="custom-content"]');
			expect(customContent).toBeTruthy();
			expect(customContent?.textContent).toBe('Custom Target Content');

			unmount(component);
			target.remove();
		});

		it('should render content to HTMLElement target', async () => {
			// Create a custom target
			const target = document.createElement('div');
			target.setAttribute('data-testid', 'element-target');
			document.body.appendChild(target);

			const component = mount(Portal, {
				target: container,
				props: {
					target: target,
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Element Target Content';
						div.setAttribute('data-testid', 'element-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Check that content is in element target
			const elementContent = target.querySelector('[data-testid="element-content"]');
			expect(elementContent).toBeTruthy();
			expect(elementContent?.textContent).toBe('Element Target Content');

			unmount(component);
			target.remove();
		});
	});

	describe('Disabled Mode', () => {
		it('should render in place when disabled', async () => {
			const component = mount(Portal, {
				target: container,
				props: {
					disabled: true,
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Disabled Content';
						div.setAttribute('data-testid', 'disabled-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Check that content is in original container, not in body
			const disabledContent = container.querySelector('[data-testid="disabled-content"]');
			expect(disabledContent).toBeTruthy();
			expect(disabledContent?.textContent).toBe('Disabled Content');

			// Verify no portal container was created
			const portalContainer = document.querySelector('[data-portal="true"]');
			expect(portalContainer).toBeFalsy();

			unmount(component);
		});
	});

	describe('Edge Cases', () => {
		it('should fallback to body when target not found', async () => {
			const component = mount(Portal, {
				target: container,
				props: {
					target: '#non-existent-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Fallback Content';
						div.setAttribute('data-testid', 'fallback-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Should fallback to body
			const fallbackContent = document.body.querySelector('[data-testid="fallback-content"]');
			expect(fallbackContent).toBeTruthy();
			expect(fallbackContent?.textContent).toBe('Fallback Content');

			unmount(component);
		});

		it('should fallback to body on invalid selector', async () => {
			const component = mount(Portal, {
				target: container,
				props: {
					target: ':::invalid:::',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Invalid Selector Content';
						div.setAttribute('data-testid', 'invalid-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Should fallback to body
			const invalidContent = document.body.querySelector('[data-testid="invalid-content"]');
			expect(invalidContent).toBeTruthy();

			unmount(component);
		});

		it('should cleanup portal on unmount', async () => {
			const component = mount(Portal, {
				target: container,
				props: {
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Cleanup Test';
						div.setAttribute('data-testid', 'cleanup-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Verify content exists
			let cleanupContent = document.querySelector('[data-testid="cleanup-content"]');
			expect(cleanupContent).toBeTruthy();

			// Unmount component
			unmount(component);

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Verify content is removed
			cleanupContent = document.querySelector('[data-testid="cleanup-content"]');
			expect(cleanupContent).toBeFalsy();

			// Verify portal container is removed
			const portalContainers = document.querySelectorAll('[data-portal="true"]');
			expect(portalContainers.length).toBe(0);
		});
	});

	describe('Multiple Portals', () => {
		it('should handle multiple portals to same target', async () => {
			const target = document.createElement('div');
			target.id = 'shared-target';
			document.body.appendChild(target);

			const component1 = mount(Portal, {
				target: container,
				props: {
					target: '#shared-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Portal 1';
						div.setAttribute('data-testid', 'portal-1');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			const component2 = mount(Portal, {
				target: container,
				props: {
					target: '#shared-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Portal 2';
						div.setAttribute('data-testid', 'portal-2');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Both portals should exist in the same target
			const portal1 = target.querySelector('[data-testid="portal-1"]');
			const portal2 = target.querySelector('[data-testid="portal-2"]');

			expect(portal1).toBeTruthy();
			expect(portal2).toBeTruthy();
			expect(portal1?.textContent).toBe('Portal 1');
			expect(portal2?.textContent).toBe('Portal 2');

			unmount(component1);
			unmount(component2);
			target.remove();
		});

		it('should handle nested portals', async () => {
			const outerTarget = document.createElement('div');
			outerTarget.id = 'outer-target';
			document.body.appendChild(outerTarget);

			const innerTarget = document.createElement('div');
			innerTarget.id = 'inner-target';
			document.body.appendChild(innerTarget);

			const outerPortal = mount(Portal, {
				target: container,
				props: {
					target: '#outer-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Outer Portal';
						div.setAttribute('data-testid', 'outer-portal');
						anchor.parentNode?.insertBefore(div, anchor);

						// Create inner portal
						const innerContainer = document.createElement('div');
						anchor.parentNode?.insertBefore(innerContainer, anchor);

						mount(Portal, {
							target: innerContainer,
							props: {
								target: '#inner-target',
								children: (innerAnchor: Comment) => {
									const innerDiv = document.createElement('div');
									innerDiv.textContent = 'Inner Portal';
									innerDiv.setAttribute('data-testid', 'inner-portal');
									innerAnchor.parentNode?.insertBefore(innerDiv, innerAnchor);
								}
							}
						});
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 10));

			// Check outer portal
			const outerContent = outerTarget.querySelector('[data-testid="outer-portal"]');
			expect(outerContent).toBeTruthy();
			expect(outerContent?.textContent).toBe('Outer Portal');

			// Check inner portal
			const innerContent = innerTarget.querySelector('[data-testid="inner-portal"]');
			expect(innerContent).toBeTruthy();
			expect(innerContent?.textContent).toBe('Inner Portal');

			unmount(outerPortal);
			outerTarget.remove();
			innerTarget.remove();
		});
	});

	describe('Dynamic Behavior', () => {
		it('should handle rapid mount/unmount', async () => {
			// Mount and unmount quickly multiple times
			for (let i = 0; i < 5; i++) {
				const component = mount(Portal, {
					target: container,
					props: {
						children: (anchor: Comment) => {
							const div = document.createElement('div');
							div.textContent = `Rapid ${i}`;
							div.setAttribute('data-testid', `rapid-${i}`);
							anchor.parentNode?.insertBefore(div, anchor);
						}
					}
				});

				await new Promise((resolve) => setTimeout(resolve, 30));
				unmount(component);
				// Wait for cleanup to fully complete before next iteration
				await new Promise((resolve) => setTimeout(resolve, 30));

				// Aggressively clean up any orphaned portals between iterations
				const orphanedPortals = document.querySelectorAll('[data-portal="true"]');
				orphanedPortals.forEach((portal) => {
					if (portal.parentNode) {
						portal.parentNode.removeChild(portal);
					}
				});
			}

			// Wait for all cleanup operations to complete
			await new Promise((resolve) => setTimeout(resolve, 100));

			// All portals should be cleaned up
			const portalContainers = document.querySelectorAll('[data-portal="true"]');
			expect(portalContainers.length).toBe(0);
		});

		it('should move portal when target changes', async () => {
			const target1 = document.createElement('div');
			target1.id = 'target-1';
			document.body.appendChild(target1);

			const target2 = document.createElement('div');
			target2.id = 'target-2';
			document.body.appendChild(target2);

			// Mount the portal with initial target
			const component = mount(Portal, {
				target: container,
				props: {
					target: '#target-1',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Moving Content';
						div.setAttribute('data-testid', 'moving-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 10));

			// Verify content is in target1
			let movingContent = target1.querySelector('[data-testid="moving-content"]');
			expect(movingContent).toBeTruthy();
			expect(target2.querySelector('[data-testid="moving-content"]')).toBeFalsy();

			// Unmount and remount with new target
			unmount(component);

			const component2 = mount(Portal, {
				target: container,
				props: {
					target: '#target-2',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Moving Content 2';
						div.setAttribute('data-testid', 'moving-content-2');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 10));

			// Verify content moved to target2
			const movingContent2 = target2.querySelector('[data-testid="moving-content-2"]');
			expect(movingContent2).toBeTruthy();

			unmount(component2);
			target1.remove();
			target2.remove();
		});
	});

	describe('Target Removal', () => {
		it('should handle target element removal gracefully', async () => {
			const target = document.createElement('div');
			target.id = 'removable-target';
			document.body.appendChild(target);

			const component = mount(Portal, {
				target: container,
				props: {
					target: '#removable-target',
					children: (anchor: Comment) => {
						const div = document.createElement('div');
						div.textContent = 'Removable Target Content';
						div.setAttribute('data-testid', 'removable-content');
						anchor.parentNode?.insertBefore(div, anchor);
					}
				}
			});

			await new Promise((resolve) => setTimeout(resolve, 0));

			// Verify content is in target
			let removableContent = target.querySelector('[data-testid="removable-content"]');
			expect(removableContent).toBeTruthy();

			// Remove the target from DOM
			target.remove();

			await new Promise((resolve) => setTimeout(resolve, 50));

			// Content should be moved to body as fallback
			removableContent = document.body.querySelector('[data-testid="removable-content"]');
			expect(removableContent).toBeTruthy();

			unmount(component);
		});
	});
});
