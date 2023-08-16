const { Client } = require("pg");
const readlineSync = require("readline-sync");

async function runSearcher() {
  const client = new Client({
    user: "academy",
    password: "",
    host: "",
    port: "5432",
    database: "omdb",
  });
  await client.connect();

  while (true) {
    let searchTerm = readlineSync.question(
      "Type some text for searching (or 'q' to exit)\n",
      {}
    );

    if (searchTerm.toLowerCase() === "q") {
      break;
    }

    const text = "select name from movies where name like $1 limit 10";
    const values = [`%${searchTerm}%`];

    const res = await client.query(text, values);
    console.log(res.rows);
  }

  await client.end();
}

runSearcher();
