import connectDB from '@/config/database';
import ItemCategory from '@/models/ItemCategory';

export const GET = async () => {
	try {
		await connectDB();

		const itemCategories = await ItemCategory.find().sort({ name: 1 });

		return new Response(JSON.stringify(itemCategories));
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};
