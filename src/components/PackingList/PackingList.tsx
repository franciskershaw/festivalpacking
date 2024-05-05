'use client';

import CategoryHeader from './CategoryHeader';
import NoItems from './NoItems';
import PackingListItem from './PackingListItem';
import usePackingList from './usePackingList';

import Accordion, { AccordionItem } from '../Accordion/Accordion';

const PackingList = () => {
	const { categorisedItems } = usePackingList();

	return (
		<div className="mt-20">
			{categorisedItems.length ? (
				<Accordion>
					{categorisedItems.map((category) => (
						<AccordionItem
							key={category._id}
							header={<CategoryHeader category={category} />}
							openByDefault
						>
							<ul className="space-y-4">
								{category.items.map((item) => (
									<li key={item._id}>
										<PackingListItem item={item} />
									</li>
								))}
							</ul>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<NoItems />
			)}
		</div>
	);
};

export default PackingList;
