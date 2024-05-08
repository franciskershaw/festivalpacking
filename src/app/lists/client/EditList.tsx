'use client';

import Link from 'next/link';

import { useList } from '@/providers/ListContext';
import { List } from '@/utils/types';

import Icon from '@/components/Icon/Icon';

const EditList = ({ list }: { list: List }) => {
	const { setList } = useList();
	return (
		<Link onClick={() => setList(list)} href="/">
			<Icon name="FaPenToSquare" size={20} />
		</Link>
	);
};

export default EditList;
