import { useEffect } from 'react';

export const useEnterFormSubmit = ({
	isFormOpen,
	onSubmit,
}: {
	isFormOpen: boolean;
	onSubmit: () => void;
}) => {
	useEffect(() => {
		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === 'Enter' &&
				document.activeElement === document.body &&
				isFormOpen === true
			) {
				onSubmit();
			}
		};

		window.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			window.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [onSubmit, isFormOpen]);
};
