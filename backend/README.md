# atsound

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn start
```

### To create a new migration

```
yarn sequelize migration:create --name=xxxxx-xxxx
```

### To run all migrations run

```
yarn sequelize db:migrate
```

### Rolling back the most recent modifications

```
yarn sequelize db:migrate:undo
```

### Can undo to the initial state

```
yarn sequelize db:migrate:undo:all
```

### Reverse only a specific migration.

```
yarn sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-xxxx-xxxx.js
```

### To create a new seeder

```
yarn sequelize seed:generate --name xxxx
```

### Execute all seeders

```
yarn sequelize db:seed:all
```

### Undoing newer seeders

```
yarn sequelize db:seed:undo
```

## Revert a specific seed

```
yarn sequelize db:seed:undo --seed name-of-seed-as-in-data
```

## Revert a specific seed

```
yarn sequelize db:seed:undo:all
```
