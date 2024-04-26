import connectDB from '@/config/database';
import User from '@/models/User';

import { Session, Profile } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

function generateUsername(email: string): string {
  if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    return 'defaultUser';
  }
  const atIndex = email.indexOf('@');
  return email.substring(0, atIndex);
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
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
  callbacks: {
    // // Invoked on successful signin
    // async signIn({ profile }: { profile: Profile }) {
    //   // 1. Connect to database
    //   await connectDB();
    //   // 2. Check if user exists
    //   const userExists = await User.findOne({ email: profile.email });
    //   // 3 If not, then add user to database
    //   if (!userExists) {
    //     // Truncate user name if too long
    //     const username =
    //       profile.name?.slice(0, 20) || generateUsername(profile.email || '');
    //     await User.create({
    //       email: profile.email,
    //       username,
    //     });
    //   }
    //   // 4. Return true to allow sign in
    //   return true;
    async signIn(response: any) {
      console.log(response);
      const profile = response.profile;
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        const username = profile.name.slice(0, 30);
        await User.create({ email: profile.email, username });
      }
      return true;
    },
    // // Modifies the session object
    async session({ session }: { session: Session }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. Return sesion
      return session;
    },
  },
};
