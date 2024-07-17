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
export const [
    useSelectArticleEditPageImg, selectArticleEditPageImg,
] = buildSelector((state) => state.articleEditPage?.data?.img);
export const [
    useSelectArticleEditTypes, selectArticleEditTypes,
] = buildSelector((state) => state.articleEditPage?.data?.type);
