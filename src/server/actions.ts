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
}): Promise<{ success: boolean; message: string; data: string | null }> {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return {
				success: false,
				message: 'You must be logged in to create a new list',
				data: null,
			};
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
		await getUserLists();

		return {
			success: true,
			message: 'List created successfully',
			data: JSON.stringify(newList),
		};
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong');
	}
}

export async function getUserLists() {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return {
				success: false,
				message: 'You must be logged in to retrieve saved lists',
				data: null,
			};
		}

		const lists = await List.find({ createdBy: sessionUser.user._id });
		return {
			success: true,
			message: 'Found lists',
			data: JSON.parse(JSON.stringify(lists)),
		};
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong');
	}
}
