import connectDB from '@/config/database';
import User from '@/models/User';
import { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn(response: any) {
			const profile = response.profile;
			await connectDB();
			const userExists = await User.findOne({ email: profile.email });
			if (!userExists) {
				const username = profile.name.slice(0, 30);
				await User.create({ email: profile.email, username });
			}
			return true;
		},
		async session({ session }: { session: Session }) {
			const user = await User.findOne({ email: session.user.email });
			session.user._id = user._id.toString();
			return session;
		},
	},
};
