import type { Snippet } from 'svelte';
import type { TransitionConfig } from 'svelte/transition';

export type PopoverState = 'open' | 'closed';

export type PopoverContext = {
	state: PopoverState;
	open: () => void;
	toggle: () => void;
	close: () => void;
};

export type PopoverInstance = {
	state: PopoverState;
	open: () => void;
	toggle: () => void;
	close: () => void;
};

export type RootProps = {
	children: Snippet;
	open?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
};

export type TriggerProps = {
	children: Snippet;
};

export type ContentProps = {
	children: Snippet;
	portal?: boolean;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	class?: string | string[];
	motion?: TransitionConfig | TransitionConfig[];
};
