'use server';

import connectDB from '@/config/database';
import List from '@/models/List';
import getSessionUser from '@/utils/getSessionUser';
import { Item } from '@/utils/types';

export async function getItems() {
	const res = await fetch('http://localhost:3000/api/items');
	const data = await res.json();
	return data;
}

export async function createList({
	name,
	items,
}: {
	name: string;
	items: Item[];
}) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({
					message: 'You must be logged in to create a new list',
				}),
				{ status: 401 },
			);
		}

		const formattedItems = items.map((item: Item) => ({
			_id: item._id,
			obtained: item.obtained,
		}));

		const newList = new List({
			name,
			items: formattedItems,
			createdBy: sessionUser.userId,
		});

		await newList.save();

		return { data: JSON.stringify(newList) };
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong');
	}
}
