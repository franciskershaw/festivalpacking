'use client';

import Link from 'next/link';

import Icon from '@/components/Icon/Icon';

const EditList = () => {
	return (
		<Link onClick={() => console.log('does this work?')} href="/">
			<Icon name="FaPenToSquare" size={20} />
		</Link>
	);
};

export default EditList;
