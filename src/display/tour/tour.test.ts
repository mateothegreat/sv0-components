// import { fireEvent, render, screen } from "@testing-library/svelte";
// import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import type { TourStep } from "./tour.svelte";
// import Tour from "./tour.svelte";

// describe("Tour Component", () => {
//   let mockSteps: TourStep[];

//   beforeEach(() => {
//     document.body.innerHTML = "";

//     // Create test elements for targeting
//     const testDiv = document.createElement("div");
//     testDiv.id = "test-element";
//     testDiv.textContent = "Target Element";
//     document.body.appendChild(testDiv);

//     mockSteps = [
//       {
//         id: "step1",
//         selector: "#test-element",
//         title: "First Step",
//         description: "This is the first step of the tour"
//       },
//       {
//         id: "step2",
//         title: "Second Step",
//         description: "This is the second step",
//         snippet: 'console.log("Hello World");'
//       },
//       {
//         id: "step3",
//         title: "Final Step",
//         description: "This is the final step"
//       }
//     ];
//   });

//   afterEach(() => {
//     document.body.style.overflow = "";
//   });

//   it("renders tour when open is true", () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     expect(screen.getByText("First Step")).toBeInTheDocument();
//     expect(screen.getByText("This is the first step of the tour")).toBeInTheDocument();
//     expect(screen.getByText("1 of 3")).toBeInTheDocument();
//   });

//   it("does not render tour when open is false", () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: false
//       }
//     });

//     expect(screen.queryByText("First Step")).not.toBeInTheDocument();
//   });

//   it("does not render tour when steps array is empty", () => {
//     render(Tour, {
//       props: {
//         steps: [],
//         open: true
//       }
//     });

//     expect(screen.queryByText("First Step")).not.toBeInTheDocument();
//   });

//   it("navigates to next step when Next button is clicked", async () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     const nextButton = screen.getByText("Next");
//     await fireEvent.click(nextButton);

//     expect(screen.getByText("Second Step")).toBeInTheDocument();
//     expect(screen.getByText("This is the second step")).toBeInTheDocument();
//     expect(screen.getByText("2 of 3")).toBeInTheDocument();
//   });

//   it("navigates to previous step when Previous button is clicked", async () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     // Go to next step first
//     const nextButton = screen.getByText("Next");
//     await fireEvent.click(nextButton);

//     // Then go back
//     const prevButton = screen.getByText("Previous");
//     await fireEvent.click(prevButton);

//     expect(screen.getByText("First Step")).toBeInTheDocument();
//     expect(screen.getByText("1 of 3")).toBeInTheDocument();
//   });

//   it("disables Previous button on first step", () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     const prevButton = screen.getByText("Previous");
//     expect(prevButton).toBeDisabled();
//   });

//   it("shows Finish button on last step", async () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     // Navigate to last step
//     const nextButton = screen.getByText("Next");
//     await fireEvent.click(nextButton);
//     await fireEvent.click(nextButton);

//     expect(screen.getByText("Final Step")).toBeInTheDocument();
//     expect(screen.getByText("Finish")).toBeInTheDocument();
//     expect(screen.queryByText("Next")).not.toBeInTheDocument();
//   });

//   it("calls onClose when close button is clicked", async () => {
//     const onClose = vi.fn();
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true,
//         onClose
//       }
//     });

//     const closeButton = screen.getByLabelText("Close tour");
//     await fireEvent.click(closeButton);

//     expect(onClose).toHaveBeenCalledOnce();
//   });

//   it("calls onClose when Finish button is clicked", async () => {
//     const onClose = vi.fn();
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true,
//         onClose
//       }
//     });

//     // Navigate to last step
//     const nextButton = screen.getByText("Next");
//     await fireEvent.click(nextButton);
//     await fireEvent.click(nextButton);

//     // Click finish
//     const finishButton = screen.getByText("Finish");
//     await fireEvent.click(finishButton);

//     expect(onClose).toHaveBeenCalledOnce();
//   });

//   it("calls onStepChange when navigating between steps", async () => {
//     const onStepChange = vi.fn();
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true,
//         onStepChange
//       }
//     });

//     const nextButton = screen.getByText("Next");
//     await fireEvent.click(nextButton);

//     expect(onStepChange).toHaveBeenCalledWith(1);
//   });

//   it("renders code snippet when provided", () => {
//     render(Tour, {
//       props: {
//         steps: [mockSteps[1]], // Step with snippet
//         open: true
//       }
//     });

//     expect(screen.getByText('console.log("Hello World");')).toBeInTheDocument();
//   });

//   it("sets body overflow to hidden when tour is open", () => {
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true
//       }
//     });

//     expect(document.body.style.overflow).toBe("hidden");
//   });

//   it("closes tour when backdrop is clicked", async () => {
//     const onClose = vi.fn();
//     render(Tour, {
//       props: {
//         steps: mockSteps,
//         open: true,
//         onClose
//       }
//     });

//     const backdrop = document.querySelector(".bg-black\\/50");
//     expect(backdrop).toBeTruthy();

//     await fireEvent.click(backdrop!);
//     expect(onClose).toHaveBeenCalledOnce();
//   });

//   it("renders spotlight for steps with selectors", () => {
//     render(Tour, {
//       props: {
//         steps: [mockSteps[0]], // Step with selector
//         open: true
//       }
//     });

//     // Check if spotlight element exists
//     const spotlight = document.querySelector(
//       ".shadow-\\[0_0_0_4px_rgba\\(59\\,130\\,246\\,0\\.5\\)\\]"
//     );
//     expect(spotlight).toBeTruthy();
//   });

//   it("does not render spotlight for steps without selectors", () => {
//     render(Tour, {
//       props: {
//         steps: [mockSteps[1]], // Step without selector
//         open: true
//       }
//     });

//     // Check if spotlight element doesn't exist
//     const spotlight = document.querySelector(
//       ".shadow-\\[0_0_0_4px_rgba\\(59\\,130\\,246\\,0\\.5\\)\\]"
//     );
//     expect(spotlight).toBeFalsy();
//   });
// });
