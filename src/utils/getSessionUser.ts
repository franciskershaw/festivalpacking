import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth/next';

const getSessionUser = async () => {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			return null;
		}

		return {
			user: session.user,
			userId: session.user._id,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default getSessionUser;
