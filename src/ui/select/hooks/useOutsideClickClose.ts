import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
	excludeRefs?: React.RefObject<HTMLElement>[];
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
	excludeRefs = [],
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			if (!(target instanceof Node)) return;

			const isClickOnExcluded = excludeRefs.some((ref) =>
				ref.current?.contains(target)
			);

			if (!rootRef.current?.contains(target) && !isClickOnExcluded) {
				isOpen && onClose?.();
				onChange?.(false);
			} else {
				return;
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen, rootRef, excludeRefs]);
};
