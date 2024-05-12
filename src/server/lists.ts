'use server';

import { revalidatePath } from 'next/cache';

import connectDB from '@/config/database';
import Item from '@/models/Item';
import ItemCategory from '@/models/ItemCategory';
import List from '@/models/List';
import getSessionUser from '@/utils/getSessionUser';
import { Category, Item as ItemType } from '@/utils/types';

export async function createList({
	name,
	items,
}: {
	name: string;
	items: ItemType[];
}) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
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
		revalidatePath('/lists');

		return {
			success: true,
			message: 'List created successfully',
			data: JSON.stringify(newList),
		};
	} catch (error) {
		console.log(error);
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
			throw new Error('You must be logged in to edit a list');
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
	}
}

export async function updateName({ _id, name }: { _id: string; name: string }) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
		}

		const list = await List.findById(_id);
		if (!list) {
			throw new Error('List not found');
		}

		if (list.createdBy.toString() !== sessionUser.user._id) {
			throw new Error('You must be the creator of the list to edit it');
		}

		const updatedList = await List.findByIdAndUpdate(
			_id,
			{ name },
			{ new: true },
		);

		revalidatePath('/lists');

		return {
			success: true,
			message: 'List updated',
			data: JSON.stringify(updatedList),
		};
	} catch (error) {
		console.log(error);
	}
}

interface ListItem {
	_id: string;
	obtained: boolean;
}

export async function addItemToList({
	listId,
	itemId,
}: {
	listId: string;
	itemId: string;
}) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
		}

		const list = await List.findById(listId);
		if (!list) {
			throw new Error('List not found');
		}

		if (list.createdBy.toString() !== sessionUser.user._id) {
			throw new Error('You must be the creator of the list to edit it');
		}

		const listItems: ListItem[] = list.items as ListItem[];
		const itemAlreadyInArray = listItems.some(
			(item) => item._id.toString() === itemId,
		);

		if (itemAlreadyInArray) {
			return {
				success: false,
				message: 'Item already in list',
				data: null,
			};
		}

		const newItem = { _id: itemId, obtained: false };
		list.items.push(newItem);
		await list.save();

		revalidatePath('/lists');

		return {
			success: true,
			message: 'List updated',
			data: JSON.stringify(list),
		};
	} catch (error) {
		console.log(error);
	}
}

export async function removeItemFromList({
	listId,
	itemId,
}: {
	listId: string;
	itemId: string;
}) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
		}

		const list = await List.findById(listId);
		if (!list) {
			throw new Error('List not found');
		}

		if (list.createdBy.toString() !== sessionUser.user._id) {
			throw new Error('You must be the creator of the list to edit it');
		}

		const listItems: ListItem[] = list.items as ListItem[];
		const itemInArray = listItems.some(
			(item) => item._id.toString() === itemId,
		);

		if (!itemInArray) {
			return {
				success: false,
				message: 'Item not in list',
				data: null,
			};
		}

		list.items = listItems.filter((item) => item._id.toString() !== itemId);

		await list.save();

		revalidatePath('/lists');

		return {
			success: true,
			message: 'Item removed from list',
			data: JSON.stringify(list),
		};
	} catch (error) {
		console.log(error);
	}
}

export async function toggleItemObtainedInList({
	listId,
	itemId,
}: {
	listId: string;
	itemId: string;
}) {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
		}

		const list = await List.findById(listId);
		if (!list) {
			throw new Error('List not found');
		}

		if (list.createdBy.toString() !== sessionUser.user._id) {
			throw new Error('You must be the creator of the list to edit it');
		}

		const listItems: ListItem[] = list.items as ListItem[];
		const itemIndex = listItems.findIndex(
			(item) => item._id.toString() === itemId,
		);

		if (itemIndex === -1) {
			return {
				success: false,
				message: 'Item not found in list',
				data: null,
			};
		}

		listItems[itemIndex].obtained = !listItems[itemIndex].obtained;
		await list.save();

		revalidatePath('/lists');

		return {
			success: true,
			message: `Item ${listItems[itemIndex].obtained ? 'obtained' : 'not obtained'}`,
			data: JSON.stringify(list),
		};
	} catch (error) {
		console.log(error);
	}
}

export async function deleteList({ _id }: { _id: string }) {
	console.log('_id:', _id);
	try {
		await connectDB();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to delete a list');
		}

		const list = await List.findById(_id);
		if (!list) {
			throw new Error('List not found');
		}

		if (list.createdBy.toString() !== sessionUser.user._id) {
			throw new Error('You must be the creator of the list to delete it');
		}

		await List.findByIdAndDelete(_id);

		revalidatePath('/lists');

		return {
			success: true,
			message: 'List deleted',
			data: JSON.stringify({ _id }),
		};
	} catch (error) {
		console.log(error);
	}
}
