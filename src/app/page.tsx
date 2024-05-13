import AddItemModal from '@/components/AddItem/AddItemModal';
import ListHeader from '@/components/ListHeader/ListHeader';
import PackingList from '@/components/PackingList/PackingList';

export const dynamic = 'force-dynamic';

export type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
	const showNewItemModal = searchParams?.newItem;
	const newItemName = searchParams?.newItemName;

	return (
		<>
			<ListHeader />
			<PackingList />
			{showNewItemModal && newItemName && (
				<AddItemModal newItemName={newItemName} />
			)}
		</>
	);
}
