// /**
//  * @file
//  *
//  *   This module contains comprehensive test coverage for the EmptyState component.
//  *
//  *   The tests ensure that the EmptyState component correctly renders all visual elements, handles user interactions properly, maintains
//  *   accessibility standards, and provides a robust empty state experience across different configurations.
//  *
//  *   ## Core Test Areas
//  *
//  *   1. **Visual Rendering:** Verifies that all text, icons, and layout elements render correctly.
//  *   2. **User Interactions:** Tests click and keyboard interactions with option cards.
//  *   3. **Accessibility:** Ensures proper ARIA attributes and keyboard navigation support.
//  */

// import { fireEvent, render, screen } from "@testing-library/svelte";
// import { inspect } from "util";
// import { describe, expect, test, vi } from "vitest";
// import EmptyState from "./empty-state.svelte";
// import type { EmptyStateProps } from "./types.js";

// describe("EmptyState", () => {
//   /**
//    * Default props used across multiple tests. Provides a complete configuration with multiple options to test all component features.
//    *
//    * @category Testing
//    */
//   const defaultProps: EmptyStateProps = {
//     title: "Create your first project",
//     description: "Start by selecting a template or begin with a blank canvas.",
//     options: [
//       {
//         id: "marketing",
//         title: "Marketing Campaign",
//         description: "Plan and launch engaging campaigns to reach your audience.",
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone h-6 w-6 text-white" aria-hidden="true"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
//         iconColor: "bg-pink-500"
//       },
//       {
//         id: "engineering",
//         title: "Engineering Project",
//         description: "Manage complex builds and bring your technical ideas to life.",
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-terminal h-6 w-6 text-white" aria-hidden="true"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>',
//         iconColor: "bg-purple-500"
//       },
//       {
//         id: "event",
//         title: "Event",
//         description: "Organize and track events that matter — from meetups to conferences.",
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days h-6 w-6 text-white" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>',
//         iconColor: "bg-orange-500"
//       }
//     ]
//   };

//   test("renders the component with title and description", () => {
//     /**
//      * Verifies that the main heading and description text are rendered correctly. These elements provide the primary context for the empty
//      * state.
//      */
//     render(EmptyState, { props: defaultProps });
//     console.log(
//       inspect({ test: "title and description rendering" }, { colors: true, compact: false })
//     );

//     expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
//       "Create your first project"
//     );
//     expect(
//       screen.getByText("Start by selecting a template or begin with a blank canvas.")
//     ).toBeInTheDocument();
//   });

//   test("renders all options with correct content", () => {
//     /**
//      * Ensures that all option cards are rendered with their respective titles and descriptions. This verifies the component correctly
//      * iterates through the options array.
//      */
//     render(EmptyState, { props: defaultProps });
//     console.log(
//       inspect(
//         { test: "options rendering", optionCount: defaultProps.options.length },
//         { colors: true, compact: false }
//       )
//     );

//     // Check first option
//     expect(screen.getByText("Marketing Campaign")).toBeInTheDocument();
//     expect(
//       screen.getByText("Plan and launch engaging campaigns to reach your audience.")
//     ).toBeInTheDocument();

//     // Check second option
//     expect(screen.getByText("Engineering Project")).toBeInTheDocument();
//     expect(
//       screen.getByText("Manage complex builds and bring your technical ideas to life.")
//     ).toBeInTheDocument();

//     // Check third option
//     expect(screen.getByText("Event")).toBeInTheDocument();
//     expect(
//       screen.getByText("Organize and track events that matter — from meetups to conferences.")
//     ).toBeInTheDocument();
//   });

//   test("renders empty project link with default text", () => {
//     /**
//      * Verifies the default empty project link renders with correct href and text when custom values are not provided.
//      */
//     render(EmptyState, { props: defaultProps });
//     console.log(inspect({ test: "default empty project link" }, { colors: true, compact: false }));

//     const link = screen.getByRole("link");
//     expect(link).toHaveAttribute("href", "#");
//     expect(link).toHaveTextContent("or start from an empty project");
//   });

//   test("renders custom empty project text and href", () => {
//     /**
//      * Tests that custom empty project link text and href are applied correctly when provided through props.
//      */
//     const customProps = {
//       ...defaultProps,
//       emptyProjectHref: "/new-project",
//       emptyProjectText: "create blank project"
//     };

//     render(EmptyState, { props: customProps });
//     console.log(
//       inspect(
//         {
//           test: "custom empty project link",
//           customProps: { href: customProps.emptyProjectHref, text: customProps.emptyProjectText }
//         },
//         { colors: true, compact: false }
//       )
//     );

//     const link = screen.getByRole("link");
//     expect(link).toHaveAttribute("href", "/new-project");
//     expect(link).toHaveTextContent("create blank project");
//   });

//   test("calls onClick handler when option is clicked", async () => {
//     /**
//      * Verifies that clicking an option card triggers its associated onClick handler. This tests the component's interactive functionality.
//      */
//     const onClickSpy = vi.fn();
//     const propsWithClick = {
//       ...defaultProps,
//       options: [
//         {
//           ...defaultProps.options[0],
//           onClick: onClickSpy
//         }
//       ]
//     };

//     const { container } = render(EmptyState, { props: propsWithClick });
//     console.log(
//       inspect({ test: "onClick handler", hasClickHandler: true }, { colors: true, compact: false })
//     );

//     const optionButton = container.querySelector('[data-slot="card"]');
//     expect(optionButton).toBeInTheDocument();

//     await fireEvent.click(optionButton!);
//     expect(onClickSpy).toHaveBeenCalledTimes(1);
//   });

//   test("handles options without onClick handlers gracefully", () => {
//     /**
//      * Ensures the component doesn't break when options don't have onClick handlers. The cards should still render and be interactive
//      * visually.
//      */
//     const propsWithoutHandlers = {
//       ...defaultProps,
//       options: defaultProps.options.map((opt) => ({ ...opt, onClick: undefined }))
//     };

//     const { container } = render(EmptyState, { props: propsWithoutHandlers });
//     console.log(inspect({ test: "options without handlers" }, { colors: true, compact: false }));

//     const optionButtons = container.querySelectorAll('[data-slot="card"]');
//     expect(optionButtons).toHaveLength(3);

//     // Should not throw when clicked
//     optionButtons.forEach((button: Element) => {
//       expect(() => fireEvent.click(button)).not.toThrow();
//     });
//   });

//   test("has proper accessibility attributes", () => {
//     /**
//      * Verifies that all interactive elements have appropriate accessibility attributes for screen readers and keyboard navigation.
//      */
//     render(EmptyState, { props: defaultProps });
//     console.log(inspect({ test: "accessibility attributes" }, { colors: true, compact: false }));

//     const options = screen.getAllByRole("button");
//     options.forEach((option) => {
//       expect(option).toHaveAttribute("tabindex", "0");
//       expect(option).toHaveAttribute("role", "button");
//     });

//     // Check for aria-hidden on decorative icons
//     const { container } = render(EmptyState, { props: defaultProps });
//     const svgIcons = container.querySelectorAll('svg[aria-hidden="true"]');
//     expect(svgIcons.length).toBeGreaterThan(0);
//   });

//   test("handles keyboard navigation with Enter key", async () => {
//     /**
//      * Tests that pressing Enter on a focused option card triggers its onClick handler. This ensures keyboard accessibility compliance.
//      */
//     const onClickSpy = vi.fn();
//     const propsWithClick = {
//       ...defaultProps,
//       options: [
//         {
//           ...defaultProps.options[0],
//           onClick: onClickSpy
//         }
//       ]
//     };

//     const { container } = render(EmptyState, { props: propsWithClick });
//     console.log(inspect({ test: "Enter key navigation" }, { colors: true, compact: false }));

//     const optionButton = container.querySelector('[data-slot="card"]');
//     expect(optionButton).toBeInTheDocument();

//     // Test Enter key
//     const enterEvent = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
//     await fireEvent(optionButton!, enterEvent);
//     expect(onClickSpy).toHaveBeenCalledTimes(1);
//   });

//   test("handles keyboard navigation with Space key", async () => {
//     /**
//      * Tests that pressing Space on a focused option card triggers its onClick handler. Space key should work like a button click for
//      * accessibility.
//      */
//     const onClickSpy = vi.fn();
//     const propsWithClick = {
//       ...defaultProps,
//       options: [
//         {
//           ...defaultProps.options[0],
//           onClick: onClickSpy
//         }
//       ]
//     };

//     const { container } = render(EmptyState, { props: propsWithClick });
//     console.log(inspect({ test: "Space key navigation" }, { colors: true, compact: false }));

//     const optionButton = container.querySelector('[data-slot="card"]');
//     expect(optionButton).toBeInTheDocument();

//     // Test Space key
//     const spaceEvent = new KeyboardEvent("keydown", { key: " ", bubbles: true });
//     await fireEvent(optionButton!, spaceEvent);
//     expect(onClickSpy).toHaveBeenCalledTimes(1);
//   });

//   test("ignores non-interactive keyboard events", async () => {
//     /**
//      * Verifies that non-interactive keys (like Tab, Escape) don't trigger onClick handlers. Only Enter and Space should activate the option
//      * cards.
//      */
//     const onClickSpy = vi.fn();
//     const propsWithClick = {
//       ...defaultProps,
//       options: [
//         {
//           ...defaultProps.options[0],
//           onClick: onClickSpy
//         }
//       ]
//     };

//     const { container } = render(EmptyState, { props: propsWithClick });
//     console.log(
//       inspect({ test: "non-interactive keys ignored" }, { colors: true, compact: false })
//     );

//     const optionButton = container.querySelector('[data-slot="card"]');
//     expect(optionButton).toBeInTheDocument();

//     // Test non-interactive keys
//     const tabEvent = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
//     await fireEvent(optionButton!, tabEvent);

//     const escapeEvent = new KeyboardEvent("keydown", { key: "Escape", bubbles: true });
//     await fireEvent(optionButton!, escapeEvent);

//     expect(onClickSpy).not.toHaveBeenCalled();
//   });

//   test("renders with empty options array", () => {
//     /**
//      * Tests that the component handles an empty options array gracefully. Should still render title, description, and empty project link.
//      */
//     const propsWithNoOptions = {
//       ...defaultProps,
//       options: []
//     };

//     render(EmptyState, { props: propsWithNoOptions });
//     console.log(inspect({ test: "empty options array" }, { colors: true, compact: false }));

//     expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
//       "Create your first project"
//     );
//     expect(
//       screen.getByText("Start by selecting a template or begin with a blank canvas.")
//     ).toBeInTheDocument();
//     expect(screen.getByRole("link")).toBeInTheDocument();

//     // Should not have any option cards
//     const { container } = render(EmptyState, { props: propsWithNoOptions });
//     const optionButtons = container.querySelectorAll('[data-slot="card"]');
//     expect(optionButtons).toHaveLength(0);
//   });

//   test("applies correct CSS classes for styling", () => {
//     /**
//      * Verifies that all the necessary Tailwind CSS classes are applied for proper visual presentation and responsive behavior.
//      */
//     const { container } = render(EmptyState, { props: defaultProps });
//     console.log(inspect({ test: "CSS classes application" }, { colors: true, compact: false }));

//     // Check main container classes
//     const mainContainer = container.querySelector(".mx-auto.max-w-md.text-center");
//     expect(mainContainer).toBeInTheDocument();

//     // Check header classes
//     const header = container.querySelector("header.space-y-2");
//     expect(header).toBeInTheDocument();

//     // Check option card classes
//     const optionCard = container.querySelector('[data-slot="card"]');
//     expect(optionCard).toHaveClass(
//       "bg-card",
//       "text-card-foreground",
//       "hover:bg-muted",
//       "flex",
//       "cursor-pointer",
//       "rounded-xl",
//       "border",
//       "p-4"
//     );

//     // Check icon container classes
//     const iconContainer = container.querySelector(".flex-shrink-0.rounded-full.p-3");
//     expect(iconContainer).toBeInTheDocument();
//   });

//   test("renders icons with correct HTML", () => {
//     /**
//      * Ensures that SVG icons are properly rendered using the {@html} directive. The icons should be inserted as raw HTML within their
//      * containers.
//      */
//     const { container } = render(EmptyState, { props: defaultProps });
//     console.log(inspect({ test: "icon HTML rendering" }, { colors: true, compact: false }));

//     // Check that SVG elements are rendered
//     const svgElements = container.querySelectorAll("svg");
//     expect(svgElements.length).toBeGreaterThan(0);

//     // Check specific icon paths are rendered
//     const megaphonePath = container.querySelector('path[d="m3 11 18-5v12L3 14v-3z"]');
//     expect(megaphonePath).toBeInTheDocument();
//   });

//   test("maintains unique keys for list rendering", () => {
//     /**
//      * Verifies that each option is rendered with a unique key to prevent React/Svelte rendering issues and maintain proper list
//      * reconciliation.
//      */
//     const { container } = render(EmptyState, { props: defaultProps });
//     console.log(
//       inspect(
//         { test: "unique keys for options", optionIds: defaultProps.options.map((o) => o.id) },
//         { colors: true, compact: false }
//       )
//     );

//     const optionCards = container.querySelectorAll('[data-slot="card"]');
//     expect(optionCards).toHaveLength(defaultProps.options.length);

//     // Each card should be unique (no duplicate rendering)
//     const titles = Array.from(optionCards).map((card) => card.querySelector("h3")?.textContent);
//     const uniqueTitles = new Set(titles);
//     expect(uniqueTitles.size).toBe(titles.length);
//   });
// });
