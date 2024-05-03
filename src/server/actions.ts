'use server';

export async function getItems() {
	const res = await fetch('http://localhost:3000/api/items');
	const data = await res.json();
	return data;
}
