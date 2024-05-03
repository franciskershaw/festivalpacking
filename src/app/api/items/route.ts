import connectDB from '@/config/database';
import Item from '@/models/Item';
import getSessionUser from '@/utils/getSessionUser';
import { ObjectId } from 'mongodb';

export const POST = async (request: Request) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({
					message: 'You must be logged in to create a new item',
				}),
				{ status: 401 },
			);
		}

		const { name, category } = await request.json();

		const newItem = new Item({
			name,
			category,
			createdBy: sessionUser.user._id,
			approved: sessionUser.user.isAdmin ? true : false,
		});

		await newItem.save();

		return new Response(JSON.stringify({ newItem }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const GET = async (request: Request) => {
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

		const items = await Item.find(filter);

		return new Response(JSON.stringify({ items }));
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
