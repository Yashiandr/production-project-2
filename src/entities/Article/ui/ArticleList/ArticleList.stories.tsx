import type { Meta, StoryObj } from '@storybook/react';
import defaultImage from 'shared/assets/stockImage/default-image.jpg';
import defaultManAvatar from 'shared/assets/stockImage/default-man-avatar.jpg';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import {
    Article, ArticleBlockType, ArticlesView, ArticleType,
} from '../../model/types/article';
import { ArticleList } from './ArticleList';

const article = {
    id: '1',
    title: 'Введение в Javascript',
    subtitle: 'Часть 1',
    img: defaultImage,
    views: 1024,
    createdAt: '16.06.2024',
    type: [ArticleType.IT],
    user: {
        id: '1',
        username: 'username',
        avatar: defaultManAvatar,
    },
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Hello, world!',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Для того чтобы её написать, если вы пользуетесь Google Chrome, откройте меню браузера и выберите в нём команду Дополнительные инструменты > Инструменты разработчика. Окно браузера окажется разделённым на две части. В одной из них будет видна страница, в другой откроется панель с инструментами разработчика, содержащая несколько закладок. Нас интересует закладка Console (Консоль). Щёлкните по ней. Не обращайте внимания на то, что уже может в консоли присутствовать (для её очистки можете воспользоваться комбинацией клавиш Ctrl + L). Нас сейчас интересует приглашение консоли. Именно сюда можно вводить JavaScript-код, который выполняется по нажатию клавиши Enter. Введём в консоль следующее:',
            ],
        },
        {
            id: '2',
            type: ArticleBlockType.CODE,
            code: 'console.log("Hello, world!")',
        },
        {
            id: '3',
            type: ArticleBlockType.TEXT,
            title: '',
            paragraphs: [
                'Этот текст можно ввести с клавиатуры, можно скопировать и вставить его в консоль. Результат будет одним и тем же, но, если вы учитесь программировать, рекомендуется вводить тексты программ самостоятельно, а не копировать их.',
                'После того, как текст программы оказался в консоли, нажмём клавишу Enter.',
                'Если всё сделано правильно — под этой строчкой появится текст Hello, world!. На всё остальное пока не обращайте внимания.',
            ],
        },
        {
            id: '4',
            type: ArticleBlockType.IMAGE,
            src: defaultImage,
            title: 'Рисунок 1 - Первая программа в консоли браузера — вывод сообщения в консоль',
        },
        {
            id: '5',
            type: ArticleBlockType.TEXT,
            title: '',
            paragraphs: [
                'Ещё один вариант браузерного «Hello, world!» заключается в выводе окна с сообщением. Делается это так:',
            ],
        },
        {
            id: '6',
            type: ArticleBlockType.CODE,
            code: 'alert("Hello, world!")',
        },
        {
            id: '7',
            type: ArticleBlockType.TEXT,
            title: '',
            paragraphs: [
                'Вот результат выполнения этой программы.',
            ],
        },
        {
            id: '8',
            type: ArticleBlockType.IMAGE,
            src: defaultImage,
            title: 'Рисунок 2 - Вывод сообщения в окне',
        },
    ],
} as Article;

const articles = new Array(16).fill(0).map((item, index) => (
    {
        ...article,
        id: String(index),
    }
)) as Article[];

const meta = {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    decorators: [
        StoreDecorator({}),
    ],
    parameters: {
        loki: {
            skip: true,
        },
    },

    tags: ['autodocs'],

} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
    args: {
        articles,
        view: ArticlesView.SMALL,
    },
};

export const SmallIsLoading: Story = {
    args: {
        articles: [],
        view: ArticlesView.SMALL,
        isLoading: true,
    },
};

export const Big: Story = {
    args: {
        articles,
        view: ArticlesView.BIG,
    },
};

export const BigIsLoading: Story = {
    args: {
        articles: [],
        view: ArticlesView.BIG,
        isLoading: true,
    },
};
