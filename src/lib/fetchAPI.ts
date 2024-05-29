export default async function fetchAPI<T = unknown>(input: string) {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}${input}`, {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error('Network fail');
	}
	return response.json() as Promise<T>;
}