import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uIPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uIPath);
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string): boolean {
    const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
    return layers.some((layer) => value.startsWith(layer));
}

componentsDirs?.forEach((dir) => {
    const indexFilePath = `${dir.getPath()}/index.ts`;
    const indexFile = dir.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from './${dir.getBaseName()}';\n`;
        const file = dir.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

        file.save();
    }
});

files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        const valueWithoutAlias = value.replace('@/', '');

        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            const result = segments.slice(0, 3).join('/');
            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();
