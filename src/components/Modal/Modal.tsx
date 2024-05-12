import { ReactNode } from 'react';

import Icon from '../Icon/Icon';

export default function Modal({ children }: { children: ReactNode }) {
	return (
		<div
			role="presentation"
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
		>
			<dialog className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
				<button
					className="absolute top-4 right-4 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
					type="button"
				>
					<span className="sr-only">Close</span>
					<Icon name="FaXmark" size={12} />
				</button>
				{children}
			</dialog>
		</div>
	);
}
