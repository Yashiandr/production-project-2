import { buildSelector } from '@/shared/lib/store';

export const [
    useSelectArticleEditPageData, selectArticleEditPageData,
] = buildSelector((state) => state.articleEditPage?.data);
export const [
    useSelectArticleEditPageTitle, selectArticleEditPageTitle,
] = buildSelector((state) => state.articleEditPage?.data?.title);
export const [
    useSelectArticleEditPageSubtitle, selectArticleEditPageSubtitle,
] = buildSelector((state) => state.articleEditPage?.data?.subtitle);
