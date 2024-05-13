import ListHeader from '@/components/ListHeader/ListHeader';
import Modal from '@/components/Modal/Modal';
import PackingList from '@/components/PackingList/PackingList';

export const dynamic = 'force-dynamic';

export type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
	const show = searchParams?.newItem;

	return (
		<>
			{/* Header text input and search */}
			<ListHeader />
			{/* Packing list */}
			<PackingList />
			{show && (
				<Modal href="/">
					<p>Test</p>
				</Modal>
			)}
		</>
	);
}
