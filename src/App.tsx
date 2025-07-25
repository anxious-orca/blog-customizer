import { CSSProperties, useState } from 'react';
import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleStyles={articleStyles}
				setArticleStyles={setArticleStyles}
			/>
			<Article />
		</main>
	);
};
