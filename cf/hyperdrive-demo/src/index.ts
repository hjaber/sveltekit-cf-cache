import { Client } from 'pg';

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const query = new URL(request.url).searchParams.get('query');
		if (!query) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });
		try {
			await client.connect();
			const result = await client.query({ text: query });
			await client.end();

			return new Response(JSON.stringify(result.rows), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (e) {
			console.error(e);
			return new Response(JSON.stringify({ error: 'Server error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
};

// import { Client } from 'pg';

// export interface Env {
// 	HYPERDRIVE: Hyperdrive;
// }

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
// 		try {
// 			// Check if the request has a body and contains a SQL query
// 			if (request.method === 'POST' && request.headers.get('Content-Type') === 'application/json') {
// 				const requestBody: { query: string } = await request.json();
// 				const sqlQuery = requestBody.query;

// 				if (!sqlQuery) {
// 					throw new Error('No SQL query provided in the request body');
// 				}

// 				const client = new Client({ connectionString: env.HYPERDRIVE.connectionString });
// 				await client.connect();
// 				const result = await client.query({ text: sqlQuery });

// 				return new Response(JSON.stringify(result.rows), {
// 					headers: { 'Content-Type': 'application/json' },
// 				});
// 			} else {
// 				throw new Error('Invalid request method or content type');
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
// 		}
// 	},
// };
