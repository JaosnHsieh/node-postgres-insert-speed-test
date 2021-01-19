
DROP TABLE IF EXISTS "test";
DROP SEQUENCE IF EXISTS test_id_seq;
CREATE SEQUENCE test_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."test" (
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "id" integer DEFAULT nextval('test_id_seq') NOT NULL,
    "testColumn1" character varying NOT NULL,
    CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_d0f0c2ce5b5b3381100d7dff6f4" UNIQUE ("testColumn1")
) WITH (oids = false);

# insert to postgres in docker container

# $ docker-compose exec postgres sh 
# $ apt-get update
# $ apt-get install vim
# edit with vim and copy this file to ./test.sql
# $ psql -U exmaple postgres
# $ CREATE DATABASE test;
# exit psql 
# $ psql -U example -d test -a -f ./test.sql