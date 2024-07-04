## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend приложение
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server.
- `npm run start:vite` - Запуск frontend проекта на vite.
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend.
- `npm run start:dev:vite` - Запуск frontend проекта на vite + backend.
- `npm run build:prod` - Сборка в prod режиме.
- `npm run build:dev` - Сборка в dev режиме.
- `npm run lint:ts` - Проверка ts файлов линтером.
- `npm run lint:ts:fix` - Исправление ts файлов линтером.
- `npm run lint:scss` - Проверка scss файлов style линтером.
- `npm run lint:scss:fix` - Исправление scss файлов style линтером.
- `npm run test:unit` - Запуск unit тестов с jest.
- `npm run test:ui` - Запуск скриншотных тестов с loki в storybook.
- `npm run test:ui:ok` - Подтверждение изменений в скриншотах.
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI.
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов.
- `npm run test:ui:json` - Генерация json отчёта для скриншотных тестов.
- `npm run test:ui:html` - Генерация HTML отчёта для скриншотных тестов.
- `npm run storybook` - запуск Storybook.
- `npm run storybook:build` - Сборка storybook билда.
- `npm run prepare` - Прекоммит хуки.
- `npm run generate:slice` - Скрипт для генерации FSD слайсов.

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/ru/docs)


----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)


----

## Тесты

В проекте используются 4 вида тестов:

1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library - `npm run test:unit`
3) Скриншотное тестирование с loki - `npm run test:ui`
4) e2e тестирование с Cypress (TODO) `npm run test:e2e`

Подробнее о тестах - [документация тестирования](/docs/tests.md)


----

## Линтинг

В проетке используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого котроля главных архитектурных принципов используется собственный eslint plugin
*eslint-plugin-yashiandr-app-plugin*, который содержит три правила:

1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля.
2) layer-imports - проверяет корректность использования слоев с точки зрение FSD (например слой widgets нельзя
   использовать в features или entities слое)
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix.

##### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером.
- `npm run lint:ts:fix` - Исправление ts файлов линтером.
- `npm run lint:scss` - Проверка scss файлов style линтером.
- `npm run lint:scss:fix` - Исправление scss файлов style линтером.

----

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
