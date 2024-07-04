## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл с сторикейсами создает рядом с компонентом и имеет расширение .stories.tsx.

Запустить сторибук можно командой:

* `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md).

Пример:

```typescript jsx
import type {
    Meta,
    StoryObj
} from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,

    tags: ['autodocs'],

} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: '100%',
        height: 200,
    },
};
export const Circle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100,
    },
};
```

----

## Кофнигурация проекта

Для разработки проект содержит 2 конфига:

1. Webpack - ./config/build
2. vite - vite.config.ts

Оба сборщика адаптированы под основные фичи приложения.

Вся конфигурация хранится в `config`

* /config/babel - babel.
* /config/build - кофигурация webpack.
* /config/jest - кофигурация тестовой среды.
* /config/storybook - кофигурация сторибука.

В папке `scripts` находятся различные скрипты для рефакторинга\упрощение написания кода\генерации отчетов и тд.


----

## СI pipeline и pre commit хуки

Конфигурация github actions находится в /.github/workflow. В ci прогоняются все виды тестов, сборка проекта и сторибука,
линтинг.

В прекоммит хуках проверяем проект линтерами, конфиг в /.husky.


----

## Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit. По возможности переиспользуесые сущности необходимо
нормализовать с помощью Entity Adapter.

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts)

Для асинхронного подключения редюсеров
используется [DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader)


----

## Сущности (entities)

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Counter)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Фичи (features)

- [AddNewComment](/src/features/AddNewComment)
- [articleEditForm](/src/features/articleEditForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [ThemeSwither](/src/features/ThemeSwitcher)
- [ScrollSave](/src/features/ScrollSave)

----
