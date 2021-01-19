import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Test } from './entity/Test';

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'example',
  password: 'example',
  database: 'test',
  entities: [Test],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    console.log('postgres connected');
    query();
    // insert();
    setTimeout(() => {
      console.log('$ start insert');
      insert();
    }, 5000);
  })
  .catch((error) => console.log(error));

async function query(count = 1000) {
  var startAt = process.hrtime();
  const tests = await Test.createQueryBuilder('test').limit(count).getMany();
  var diff = process.hrtime(startAt);
  var time = diff[0] * 1e3 + diff[1] * 1e-6;
  console.log(new Date(), `$ query ${count} rows duration(ms)`, time);
  await wait();
  query(count);
}

async function insert(count = 1000) {
  var startAt = process.hrtime();
  for (let i = 0; i < count; ++i) {
    const test = new Test();
    test.testColumn1 = `i ${i} ${Math.random()}`;
    await test.save({ transaction: false });
  }

  var diff = process.hrtime(startAt);
  var time = diff[0] * 1e3 + diff[1] * 1e-6;
  console.log(
    `$ insert ${count} rows done. rows / second`,
    count / (time / 1000),
  );
  insert();
}

function wait(ms = 1000) {
  return new Promise((ok) => {
    setTimeout(ok, ms);
  });
}
