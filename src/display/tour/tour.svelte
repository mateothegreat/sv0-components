<script lang="ts">
	import { onMount } from 'svelte';

	export interface TourStep {
		id: string;
		selector?: string;
		title: string;
		description: string;
		snippet?: string;
		component?: any;
	}

	export interface TourProps {
		steps: TourStep[];
		open?: boolean;
		onClose?: () => void;
		onStepChange?: (stepIndex: number) => void;
	}

	let { steps, open = $bindable(false), onClose, onStepChange }: TourProps = $props();

	let currentStep = $state(0);
	let targetElement = $state<HTMLElement | null>(null);
	let spotlightPosition = $state({ top: 0, left: 0, width: 0, height: 0 });

	function nextStep() {
		if (currentStep < steps.length - 1) {
			currentStep++;
			onStepChange?.(currentStep);
			updateSpotlight();
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
			onStepChange?.(currentStep);
			updateSpotlight();
		}
	}

	function closeTour() {
		open = false;
		onClose?.();
	}

	function updateSpotlight() {
		if (!open || !steps[currentStep]) return;
		
		const step = steps[currentStep];
		if (step.selector) {
			targetElement = document.querySelector(step.selector);
			if (targetElement) {
				const rect = targetElement.getBoundingClientRect();
				spotlightPosition = {
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height
				};
			}
		} else {
			targetElement = null;
		}
	}

	onMount(() => {
		if (open) {
			updateSpotlight();
		}
	});

	$effect(() => {
		if (open) {
			updateSpotlight();
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	$effect(() => {
		if (currentStep >= 0 && currentStep < steps.length) {
			updateSpotlight();
		}
	});
</script>

{#if open && steps.length > 0}
	<div class="fixed inset-0 z-50">
		<!-- Backdrop -->
		<div 
			class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
			onclick={closeTour}
		></div>

		<!-- Spotlight -->
		{#if targetElement}
			<div
				class="absolute pointer-events-none transition-all duration-300 rounded-md shadow-[0_0_0_4px_rgba(59,130,246,0.5)] bg-transparent"
				style="top: {spotlightPosition.top - 4}px; left: {spotlightPosition.left - 4}px; width: {spotlightPosition.width + 8}px; height: {spotlightPosition.height + 8}px;"
			></div>
		{/if}

		<!-- Tour Content -->
		<div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
			<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full pointer-events-auto">
				<!-- Close Button -->
				<div class="flex justify-between items-start mb-4">
					<div class="flex-1">
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
							{steps[currentStep].title}
						</h2>
					</div>
					<button
						onclick={closeTour}
						class="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
						aria-label="Close tour"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Step Content -->
				<div class="mb-6">
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						{steps[currentStep].description}
					</p>

					<!-- Code Snippet -->
					{#if steps[currentStep].snippet}
						<div class="bg-gray-100 dark:bg-gray-700 rounded-md p-3 text-sm font-mono overflow-x-auto">
							<pre>{steps[currentStep].snippet}</pre>
						</div>
					{/if}

					<!-- Custom Component -->
					{#if steps[currentStep].component}
						<div class="mt-4">
							<svelte:component this={steps[currentStep].component} />
						</div>
					{/if}
				</div>

				<!-- Navigation -->
				<div class="flex items-center justify-between">
					<!-- Step Counter -->
					<div class="text-sm text-gray-500 dark:text-gray-400">
						{currentStep + 1} of {steps.length}
					</div>

					<!-- Navigation Buttons -->
					<div class="flex gap-2">
						<button
							onclick={prevStep}
							disabled={currentStep === 0}
							class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							Previous
						</button>
						
						{#if currentStep < steps.length - 1}
							<button
								onclick={nextStep}
								class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
							>
								Next
							</button>
						{:else}
							<button
								onclick={closeTour}
								class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
							>
								Finish
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}