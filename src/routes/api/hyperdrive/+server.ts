// src/routes/api/hyperdrive/+server.ts
import { json, type RequestHandler } from "@sveltejs/kit";
import pg from "pg";
const { Client } = pg;

export const GET: RequestHandler = async ({ platform }) => {
  const client = new Client({
    connectionString: platform?.env.HYPERDRIVE.connectionString,
  });
  try {
    // Connect to your database
    await client.connect();

    // Test query
    let result = await client.query({ text: "SELECT * FROM todos" });

    // Return result rows as JSON
    return json(result.rows);
  } catch (e) {
    console.log(e);
    return json({ error: JSON.stringify(e) }, { status: 500 });
  }
};
