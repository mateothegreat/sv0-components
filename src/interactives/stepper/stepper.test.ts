// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { render, screen, fireEvent, within } from '@testing-library/svelte';
// import { Stepper } from './index.js';
// import type { Step } from './types.js';

// const mockSteps: Step[] = [
// 	{
// 		id: 1,
// 		title: 'Step 1',
// 		subtitle: 'First step description',
// 		description: ['Feature 1', 'Feature 2'],
// 		image: '/test1.jpg',
// 		imageAlt: 'Step 1 image'
// 	},
// 	{
// 		id: 2,
// 		title: 'Step 2',
// 		subtitle: 'Second step description',
// 		description: ['Feature 3', 'Feature 4'],
// 		image: '/test2.jpg',
// 		imageAlt: 'Step 2 image'
// 	},
// 	{
// 		id: 3,
// 		title: 'Step 3',
// 		subtitle: 'Third step description',
// 		description: ['Feature 5', 'Feature 6'],
// 		image: '/test3.jpg',
// 		imageAlt: 'Step 3 image'
// 	}
// ];

// describe('Stepper', () => {
// 	beforeEach(() => {
// 		vi.useFakeTimers();
// 	});

// 	afterEach(() => {
// 		vi.restoreAllMocks();
// 		vi.useRealTimers();
// 	});

// 	it('renders all steps', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps
// 			}
// 		});

// 		mockSteps.forEach((step) => {
// 			expect(screen.getAllByText(step.title)).toHaveLength(2); // Navigation + content
// 		});
// 	});

// 	it('displays first step as active by default', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps
// 			}
// 		});

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const firstStepButton = within(navigation).getByRole('button', { name: /step 1/i });
// 		expect(firstStepButton).toHaveAttribute('aria-current', 'step');
// 	});

// 	it('allows manual step navigation', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				autoAdvance: false
// 			}
// 		});

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const secondStepButton = within(navigation).getByRole('button', { name: /step 2/i });
// 		expect(secondStepButton).toBeInTheDocument();

// 		await fireEvent.click(secondStepButton);

// 		expect(secondStepButton).toHaveAttribute('aria-current', 'step');
// 	});

// 	it('auto-advances steps when enabled', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				autoAdvance: true,
// 				autoAdvanceInterval: 1000
// 			}
// 		});

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const firstStepButton = within(navigation).getByRole('button', { name: /step 1/i });
// 		expect(firstStepButton).toHaveAttribute('aria-current', 'step');

// 		vi.advanceTimersByTime(1000);
// 		await vi.waitFor(() => {
// 			const secondStepButton = within(navigation).getByRole('button', { name: /step 2/i });
// 			expect(secondStepButton).toHaveAttribute('aria-current', 'step');
// 		});
// 	});

// 	it('cycles back to first step after last step', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				autoAdvance: true,
// 				autoAdvanceInterval: 1000
// 			}
// 		});

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });

// 		// Advance to step 2
// 		vi.advanceTimersByTime(1000);
// 		// Advance to step 3
// 		vi.advanceTimersByTime(1000);
// 		// Should cycle back to step 1
// 		vi.advanceTimersByTime(1000);

// 		await vi.waitFor(() => {
// 			const firstStepButton = within(navigation).getByRole('button', { name: /step 1/i });
// 			expect(firstStepButton).toHaveAttribute('aria-current', 'step');
// 		});
// 	});

// 	it('calls onStepChange callback when step changes', async () => {
// 		const onStepChange = vi.fn();

// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				autoAdvance: false,
// 				onStepChange
// 			}
// 		});

// 		// Clear initial call
// 		onStepChange.mockClear();

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const secondStepButton = within(navigation).getByRole('button', { name: /step 2/i });
// 		await fireEvent.click(secondStepButton);

// 		expect(onStepChange).toHaveBeenCalledWith(1);
// 	});

// 	it('renders navigation buttons', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				showNavigation: true
// 			}
// 		});

// 		expect(screen.getByLabelText('Previous step')).toBeInTheDocument();
// 		expect(screen.getByLabelText('Next step')).toBeInTheDocument();
// 	});

// 	it('hides navigation when showNavigation is false', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				showNavigation: false
// 			}
// 		});

// 		expect(screen.queryByLabelText('Previous step')).not.toBeInTheDocument();
// 		expect(screen.queryByLabelText('Next step')).not.toBeInTheDocument();
// 	});

// 	it('navigates to previous step', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				activeStep: 1,
// 				autoAdvance: false
// 			}
// 		});

// 		const prevButton = screen.getByLabelText('Previous step');
// 		await fireEvent.click(prevButton);

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const firstStepButton = within(navigation).getByRole('button', { name: /step 1/i });
// 		expect(firstStepButton).toHaveAttribute('aria-current', 'step');
// 	});

// 	it('navigates to next step', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				activeStep: 0,
// 				autoAdvance: false
// 			}
// 		});

// 		const nextButton = screen.getByLabelText('Next step');
// 		await fireEvent.click(nextButton);

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const secondStepButton = within(navigation).getByRole('button', { name: /step 2/i });
// 		expect(secondStepButton).toHaveAttribute('aria-current', 'step');
// 	});

// 	it('wraps around when navigating past boundaries', async () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				activeStep: 0,
// 				autoAdvance: false
// 			}
// 		});

// 		const prevButton = screen.getByLabelText('Previous step');
// 		await fireEvent.click(prevButton);

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const lastStepButton = within(navigation).getByRole('button', { name: /step 3/i });
// 		expect(lastStepButton).toHaveAttribute('aria-current', 'step');
// 	});

// 	it('renders mobile indicators', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				showMobileIndicators: true
// 			}
// 		});

// 		mockSteps.forEach((_, index) => {
// 			expect(screen.getByLabelText(`Go to step ${index + 1}`)).toBeInTheDocument();
// 		});
// 	});

// 	it('hides mobile indicators when showMobileIndicators is false', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				showMobileIndicators: false
// 			}
// 		});

// 		expect(screen.queryByLabelText('Go to step 1')).not.toBeInTheDocument();
// 	});

// 	it('renders step content correctly', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps
// 			}
// 		});

// 		expect(screen.getAllByText(mockSteps[0].subtitle)).toHaveLength(2); // Navigation + content
// 		mockSteps[0].description.forEach((desc) => {
// 			expect(screen.getByText(desc)).toBeInTheDocument();
// 		});
// 	});

// 	it('renders images when provided', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps
// 			}
// 		});

// 		const image = screen.getByAltText(mockSteps[0].imageAlt!);
// 		expect(image).toBeInTheDocument();
// 		expect(image).toHaveAttribute('src', mockSteps[0].image);
// 	});

// 	it('applies custom className', () => {
// 		const { container } = render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				class: 'custom-class'
// 			}
// 		});

// 		expect(container.querySelector('.custom-class')).toBeInTheDocument();
// 	});

// 	it('starts with specified activeStep', () => {
// 		render(Stepper, {
// 			props: {
// 				steps: mockSteps,
// 				activeStep: 2
// 			}
// 		});

// 		const navigation = screen.getByRole('navigation', { name: 'Process steps' });
// 		const thirdStepButton = within(navigation).getByRole('button', { name: /step 3/i });
// 		expect(thirdStepButton).toHaveAttribute('aria-current', 'step');
// 	});
// });
