export class GraphError extends Error {
	constructor() {
		super("Could not retrieve information from Graph API");
	}
}
