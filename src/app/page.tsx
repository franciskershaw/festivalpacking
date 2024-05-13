import ListHeader from '@/components/ListHeader/ListHeader';
import PackingList from '@/components/PackingList/PackingList';

export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<>
			{/* Header text input and search */}
			<ListHeader />
			{/* Packing list */}
			<PackingList />
		</>
	);
}
