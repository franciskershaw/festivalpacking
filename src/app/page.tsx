import TextInput from '@/components/TextInput/TextInput';

export default function Home() {
	return (
		<>
			{/* Header text input and search */}
			<header className="flex justify-between items-center py-8">
				<TextInput placeholder='New Festival' />
				<p>Search bar</p>
			</header>
			{/* Packing list */}
		</>
	);
}
