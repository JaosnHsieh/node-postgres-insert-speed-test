setup db by `../docker-compose.yml` and `testTable.sql`

`$ yarn`

`$ yarn start:singleRowInsert`

```
$ ts-node src/singleRowInsert.ts
postgres connected
$ insert 1000 rows done. rows / second 104.89491536172933
$ insert 1000 rows done. rows / second 102.86935071333563
$ insert 1000 rows done. rows / second 113.68657570252454

```

`$ yarn start:multipleRowInsert`

```
$ yarn start:multipleRowInsert
postgres connected
$ insert 1000 rows done. rows / second 4787.375972971931
$ insert 1000 rows done. rows / second 7255.421009335428
$ insert 1000 rows done. rows / second 9636.630698938368
```

`$ yarn start:queueBulkSave`

this is calling a custom api `queueBulkSave` on `src/entity/ExtraBaseEntity.ts` to turn each `INSERT INTO values($1,$2)` to `INSERT INTO values ($1,$2),($21,$22),($31,$32)` to able to reach `start:multipleRowInsert` write performance with `start:singleRowInsert` api style.

```
$ ts-node src/queueBulkSave.ts
postgres connected
2021-01-19T09:08:34.845Z $ saved 1 rows
2021-01-19T09:08:41.633Z $ saved 999 rows
2021-01-19T09:08:42.184Z $ saved 5000 rows
2021-01-19T09:08:42.954Z $ saved 1000 rows
2021-01-19T09:08:44.052Z $ saved 1000 rows
2021-01-19T09:08:45.003Z $ saved 1000 rows
```
