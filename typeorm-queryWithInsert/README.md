setup db by `../docker-compose.yml` and `testTable.sql`

`$ yarn`

`$ yarn start:singleRowInsert`

```
$ ts-node src/singleRowInsert.ts
postgres connected
$ insert 1000 rows done. rows / second 104.89491536172933
$ insert 1000 rows done. rows / second 102.86935071333563
$ insert 1000 rows done. rows / second 113.68657570252454
^C
```

`$ yarn start:multipleRowInsert`

```
$ yarn start:multipleRowInsert
postgres connected
$ insert 1000 rows done. rows / second 4787.375972971931
$ insert 1000 rows done. rows / second 7255.421009335428
$ insert 1000 rows done. rows / second 9636.630698938368
```
