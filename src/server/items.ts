'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import connectDB from '@/config/database';
import Item from '@/models/Item';
import ItemCategory from '@/models/ItemCategory';
import getSessionUser from '@/utils/getSessionUser';
import { ObjectId } from 'mongodb';

export async function createItem(formData: FormData) {
	await connectDB();

	const sessionUser = await getSessionUser();

	if (!sessionUser || !sessionUser.user) {
		throw new Error('You must be logged in to create an item');
	}

	const name = formData.get('newItemName');
	const category = formData.get('newItemCategory');

	const newItem = new Item({
		name,
		category,
		createdBy: sessionUser.user._id,
		approved: sessionUser.user.isAdmin ? true : false,
	});

	await newItem.save();
	await getItems();

	revalidatePath('/');

	redirect('/');
}

export async function getItems() {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		let filter: {
			approved?: boolean;
			$or?: Array<{ approved: boolean } | { createdBy: ObjectId }>;
		} = { approved: true };

		if (sessionUser) {
			filter = {
				$or: [
					{ approved: true },
					{ createdBy: new ObjectId(sessionUser.user._id) },
				],
			};
		}

		const items = await Item.find(filter)
			.populate('category', 'name faIcon', ItemCategory)
			.lean();

		return {
			success: true,
			message: 'success',
			data: JSON.parse(JSON.stringify(items)),
		};
	} catch (error) {
		console.log(error);
	}
}

export async function getItemCategories() {
	try {
		await connectDB();

		const itemCategories = await ItemCategory.find();

		return {
			sucess: true,
			message: 'success',
			data: JSON.parse(JSON.stringify(itemCategories)),
		};
	} catch (error) {
		console.log(error);
	}
}
