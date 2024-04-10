import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import pool from "./db.js";

const resolvers = {
  Query: {
    async users() {
      const users = await pool.query("SELECT * FROM users");
      console.log(users.rows);
      return users.rows;
    },
  },

  Mutation: {
    async login(_, args) {
      const { username, password } = args.credentials;

      try {
        const fetchedUser = await pool.query(
          "SELECT * FROM users WHERE username=$1",
          [username]
        );

        if (!fetchedUser.rows.length) throw new Error("Invalid Credentials");
        if (fetchedUser.rows[0].password !== password)
          throw new Error("Invalid Credentials");

        return fetchedUser.rows[0];
      } catch (err) {
        throw new Error(err.message ?? "Something went wrong");
      }
    },
    async signup(_, args) {
      const { username, password, image, profession } = args.details;

      if (!(username && password && image && profession))
        throw new Error("Provide all data");

      try {
        await pool.query(
          "INSERT into users (username, password, image, profession) VALUES ($1, $2, $3, $4)",
          [username, password, image, profession]
        );
        return true;
      } catch (err) {
        console.log(err.message);
        throw new Error(err.message ?? "Something went wrong");
      }
    },

    async createTaskGroup(_, args) {
      const { userId, title, desc, breakTime, tasks } = args.taskGroup;
      try {
        const data = await pool.query(
          "INSERT into taskgroup (breaktime,description,tasks,title,userid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [Number(breakTime), desc, tasks, title, userId]
        );
        return { ...data.rows[0], tasks: JSON.stringify(data.rows[0].tasks) };
      } catch (err) {
        throw new Error(err.message ?? "Something went wrong");
      }
    },
    async editTaskGroup(_, args) {
      const { tasks, totalTime, taskGroupId } = args.taskGroup;
      console.log(tasks, totalTime, taskGroupId);

      try {
        const data = await pool.query(
          "UPDATE taskgroup SET tasks = $1, totaltime = $2 WHERE id = $3 RETURNING *",
          [tasks, totalTime, taskGroupId]
        );
        // await new Promise((resolve) => setTimeout(resolve, 10));
        return { ...data.rows[0], tasks: JSON.stringify(data.rows[0].tasks) };
      } catch (err) {
        throw new Error(err.message ?? "Something went wrong");
      }
    },

    async getTaskOfUser(_, args) {
      const { userid } = args.data;
      try {
        const data = await pool.query(
          "SELECT * FROM taskgroup WHERE userid=$1",
          [userid]
        );
        if (!data.rows.length) throw new Error("Not found");

        return data.rows.map((row) => {
          return { ...row, tasks: JSON.stringify(row.tasks) };
        });
        // return {
        //   ...data.rows[0],
        //   tasks: JSON.stringify(data.rows[0].tasks),
        // };
      } catch (err) {
        throw new Error(err.message ?? "Something went wrong");
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at ", url + "graphql");
