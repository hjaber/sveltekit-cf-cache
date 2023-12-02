import { Client } from 'pg';

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });
		try {
			await client.connect();
			let sqlQuery: string | null = null;

			if (request.method === 'POST') {
				try {
					const requestBody: { query?: string } = await request.json();
					if (requestBody && typeof requestBody.query === 'string') {
						sqlQuery = requestBody.query;
					}
				} catch (e) {
					return new Response('Invalid request body', { status: 400 });
				}
			} else if (request.method === 'GET') {
				const url = new URL(request.url);
				sqlQuery = url.searchParams.get('query');
			} else {
				return new Response('Invalid request method', { status: 405 });
			}

			if (!sqlQuery) {
				return new Response('No SQL query provided', { status: 400 });
			}

			let result = await client.query(sqlQuery);
			return new Response(JSON.stringify(result.rows), { headers: { 'Content-Type': 'application/json' } });
		} catch (e) {
			if (e instanceof Error) {
				console.log(e.message);
				return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
			}
			return new Response('An unexpected error occurred', { status: 500 });
		}
	},
};
