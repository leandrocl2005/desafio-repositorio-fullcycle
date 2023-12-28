# Anotações do curso

## Typescript
- Instalar o typescript `npm i typescript --save-dev`
- Criar arquivo de configuração do typescript `npx tsc --init`
- Alterar tsconfig.json
- Criar arquivos src/test.ts com hello world
- testar com `npx tsc`

## Lint do Typescript
- Instalar o lint do typescript `npm i tslint --save-dev`
- Criar arquivo de configuração do lint do typescript `npx tslint --init`
- Alterar tslint.json (não haverá nenhuma)

## Sobre entidades

- criar uma entidade anêmica para começar
- criar métodos, getters e setters quando necessário
- fazer validações na entidade, sempre validar na entidade
- evitar getters e setters
- garantir 100% de consistência na criação da entidade
- evolução da entidade business driven
- atenção aos value objects

## Jest
- instalar jest: `npm i -D jest @types/jest ts-node --save-dev`
- instalar compiladores mais robustos: `npm i -D @swc/jest @swc/cli @swc/core`
- Criar arquivo de configuração do jest: `npm jest --init`
- Alterar jest.config.json (adicionar transform)

## Checagem automática de tipagens
- Cheque as tipagens também `node_modules/.bin/tsc --noEmit`
- Altere o package.json para fazer a checagem das tipagens automaticamente.

## Sequelize
- Vai dar problema com os decorators, atenção para os passos abaixo.
- Instalar sequelize: `npm install sequelize reflect-metadata sequelize-typescript`
- Instalar sqlite3: `npm install sqlite3`
- Em tsconfig.json: `"experimentalDecorators": true` e outras, ver tsconfig
- Configurar .swcrc