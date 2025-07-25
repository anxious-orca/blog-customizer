import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useEnterFormSubmit } from './hooks/useEnterFormSubmit';

type TArticleParamsFormProps = {
	articleStyles: ArticleStateType;
	setArticleStyles: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	articleStyles,
	setArticleStyles,
}: TArticleParamsFormProps) => {
	const [formState, setFormState] = useState(articleStyles);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);

	const toggleMenuOpen = () => {
		setIsMenuOpen((prev) => !prev);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
		excludeRefs: [arrowButtonRef],
	});

	const handleChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: option,
			}));
		};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const submitForm = () => {
		setArticleStyles(formState);
	};

	const handleSubmit = (e?: React.SyntheticEvent) => {
		e?.preventDefault();
		submitForm();
	};

	useEnterFormSubmit({
		isFormOpen: isMenuOpen,
		onSubmit: submitForm,
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={toggleMenuOpen}
				ref={arrowButtonRef}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
