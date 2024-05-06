// api/lists
import connectDB from '@/config/database';
import List from '@/models/List';
import getSessionUser from '@/utils/getSessionUser';
import { Item } from '@/utils/types';

export const POST = async (request: Request) => {
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

		const { name, items } = await request.json();

		const formattedItems = items.map((item: Item) => ({
			_id: item._id,
			obtained: item.obtained,
		}));

		const newList = new List({
			name,
			items: formattedItems,
		});

		await newList.save();

		return new Response(JSON.stringify({ newList }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
