process.env.PGHOST = 'localhost';
process.env.PGPORT = '5433';
process.env.PGDATABASE = 'test';
process.env.PGUSER = 'example';
process.env.PGPASSWORD = 'example';

(async function () {
  const { Pool, Client } = require('pg');
  const pool = new Pool({});
  const client = new Client();
  await client.connect();
  let times = 0;

  go();

  async function go() {
    let count = 1000;
    var startAt = process.hrtime();

    for (let i = 0; i < count; ++i) {
      const res = await pool.query(
        'INSERT INTO "test"("createdAt", "updatedAt", "testColumn1", "testColumn2", "testColumn3", "testColumn4", "testColumn5", "testColumn6") VALUES ($1, $2, $3, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "createdAt", "updatedAt", "id"',
        [
          new Date().toISOString(),
          new Date().toISOString(),
          `i ${i} ${Math.random()}`,
        ],
      );
      //  console.log('res',res.rows)
    }
    var diff = process.hrtime(startAt);
    var time = diff[0] * 1e3 + diff[1] * 1e-6;
    console.log(new Date(), `$ insert rows/seconds`, count / (time / 1000));

    if (times <= 5) {
      go();
    }
  }
  await client.end();
})();
