import ListHeader from '@/components/ListHeader/ListHeader';
import PackingList from '@/components/PackingList/PackingList';

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
