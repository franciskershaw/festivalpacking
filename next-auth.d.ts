import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface User {
		name: string;
	}

	interface Session {
		user: {
			name: string;
			email: string;
			_id: string;
			isAdmin: boolean;
		};
	}
}
