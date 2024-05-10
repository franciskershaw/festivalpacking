'use server';

import connectDB from '@/config/database';
import Item from '@/models/Item';
import ItemCategory from '@/models/ItemCategory';
import getSessionUser from '@/utils/getSessionUser';
import { Category } from '@/utils/types';
import { ObjectId } from 'mongodb';

export async function createItem({
	name,
	category,
}: {
	name: string;
	category: Category;
}) {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			throw new Error('You must be logged in to edit a list');
		}

		const newItem = new Item({
			name,
			category,
			createdBy: sessionUser.user._id,
			approved: sessionUser.user.isAdmin ? true : false,
		});

		await newItem.save();
		await getItems();

		return {
			success: true,
			message: 'List created successfully',
			data: JSON.stringify(newItem),
		};
	} catch (error) {
		console.log(error);
	}
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
