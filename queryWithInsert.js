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
  
  query1000Rows(pool);
  
  setTimeout(() => {
    console.log(new Date(), 'start insert');
    insert();
  }, 5000);

  async function insert() {
    let count = 1000;
    var startAt = process.hrtime();

    for (let i = 0; i < count; ++i) {
      await pool
        .query(
          'INSERT INTO "test"("createdAt", "updatedAt", "testColumn1") VALUES ($1, $2, $3) RETURNING "createdAt", "updatedAt", "id"',
          [
            new Date().toISOString(),
            new Date().toISOString(),
            `i ${i} ${Math.random()}`,
          ],
        )
        .catch((err) => {
          console.error('$ err', err);
        });
    }
    var diff = process.hrtime(startAt);
    var time = diff[0] * 1e3 + diff[1] * 1e-6;
    console.log(new Date(), `$ insert rows/seconds`, count / (time / 1000));
    insert()
  }
  await client.end();
})();

async function query1000Rows(pool) {
  var startAt = process.hrtime();

  const res = await pool.query('SELECT * from test limit 1000').catch((err) => {
    console.error('$query  err', err);
  });
  var diff = process.hrtime(startAt);
  var time = diff[0] * 1e3 + diff[1] * 1e-6;
  console.log(new Date(), `$ query 1000 rows time`, time);
  await wait();
  query(pool);
}


function wait(ms=1000){
    return new Promise((ok)=>{
        setTimeout(ok,ms)
    })
}