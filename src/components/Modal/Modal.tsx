import { ReactNode } from 'react';

import Link from 'next/link';

import Icon from '../Icon/Icon';

export default function Modal({
	children,
	href,
}: {
	children: ReactNode;
	href: string;
}) {
	return (
		<div
			role="presentation"
			className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gray-600 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
		>
			<dialog
				open
				className="relative w-full max-w-md rounded-lg p-6 shadow-lg my-2 mx-2 md:mb-0 text-indigo-950"
			>
				<button className="absolute top-2 right-4 rounded-md p-2" type="button">
					<Link href={href}>
						<span className="sr-only">Close</span>
						<Icon name="FaXmark" size={24} />
					</Link>
				</button>
				<div className="p-2 mt-3">{children}</div>
			</dialog>
		</div>
	);
}
