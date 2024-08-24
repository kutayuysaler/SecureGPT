export function refineInput(pattern: string, input: string): string {
	// TODO: are these useful? If yes improve them, otherwise we could remove them

	switch (pattern) {
		case 'Neutral':
			return input;
		case 'Prompt Refinement':
			return `For the prompt ${input}, what would be an improved prompt to use instead?`;
		case 'Fact Check List':
			return `${input}\nWhen you generate this answer, create a set of facts that the answer depends on that should be fact-checked and list this set of facts at the end of your output. Only include relevant facts.`;
		case 'Reflection Pattern':
			return `${input}\nWhen you generate this answer, explain the reasoning and assumptions behind your answer.`;
		default:
			console.warn(`Unknown pattern: ${pattern}`);
			return input;
	}
}
