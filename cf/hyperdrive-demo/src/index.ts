import { Client } from 'pg';

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		console.log(JSON.stringify(env));
		// Create a database client that connects to your database via Hyperdrive
		// Hyperdrive generates a unique connection string you can pass to
		// supported drivers, including node-postgres, Postgres.js, and the many
		// ORMs and query builders that use these drivers.
		const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });

		try {
			// Connect to your database
			await client.connect();

			// Test query
			let result = await client.query({ text: 'SELECT * FROM todos' });

			// Return result rows as JSON
			return Response.json(result.rows);
		} catch (e) {
			console.log(e);
			return Response.json({ error: JSON.stringify(e) }, { status: 500 });
		}
	},
};