import connectDB from '@/config/database';
import Item from '@/models/Item';
import getSessionUser from '@/utils/getSessionUser';

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
