const NoItems = ({ main, sub }: { main: string; sub: string }) => {
	return (
		<div className="h-96 flex items-center justify-center flex-col gap-4">
			<h1 className="text-2xl">{main}</h1>
			<h2>{sub}</h2>
		</div>
	);
};

export default NoItems;
