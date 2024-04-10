import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "gaurav@sql",
  host: "localhost",
  port: 5432,
  database: "pomodoro",
});

export default pool;
