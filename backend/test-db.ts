import db from "./db";

async function test() {
  const tasks = await db.orm.public.Task.all();

  console.log(tasks);

  process.exit(0);
}

test().catch((error) => {
  console.error(error);
  process.exit(1);
});