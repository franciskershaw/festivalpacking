'use server';

import connectDB from '@/config/database';
import Item from '@/models/Item';
import ItemCategory from '@/models/ItemCategory';
import List from '@/models/List';
import getSessionUser from '@/utils/getSessionUser';
import { Category, Item as ItemType, List as ListType } from '@/utils/types';

export async function createList({
	name,
	items,
}: {
	name: string;
	items: ItemType[];
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

		const formattedItems = items.map((item: ItemType) => ({
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

interface ItemPopulated {
	_id: {
		_id: string;
		name: string;
		category: Category;
		approved: boolean;
		__v: number;
	};
	obtained?: boolean;
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
		const lists = await List.find({ createdBy: sessionUser.user._id })
			.populate({
				path: 'items._id',
				model: Item,
				populate: {
					path: 'category',
					select: 'name faIcon',
					model: ItemCategory,
				},
			})
			.lean();

		const formattedLists = lists.map((list) => {
			const flattenedItems = list.items.map((item: ItemPopulated) => {
				const { _id, obtained } = item;
				return { ..._id, obtained };
			});

			return { ...list, items: flattenedItems };
		});
		return {
			success: true,
			message: 'success',
			data: JSON.parse(JSON.stringify(formattedLists)),
		};
	} catch (error) {
		console.log(error);
		throw new Error('Something went wrong');
	}
}

export async function updateName({ _id, name }: { _id: string; name: string }) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return {
				success: false,
				message: 'You must be logged in to edit a list',
				data: null,
			};
		}

		const { data: lists } = await getUserLists();

		if (!lists.find((list: ListType) => list._id === _id)) {
			return {
				success: false,
				message: 'You must be the creator of the list to edit it',
				data: null,
			};
		}

		const updatedList = await List.findByIdAndUpdate(
			_id,
			{ name },
			{ new: true },
		);

		await getUserLists();

		return {
			success: true,
			message: 'List updated',
			data: JSON.stringify(updatedList),
		};
	} catch (error) {}
}
