'use client';

import { useState } from 'react';

import CategoryHeader from './CategoryHeader';
import NoItems from './NoItems';
import PackingListItem from './PackingListItem';
import usePackingList from './usePackingList';

import Accordion, { AccordionItem } from '../Accordion/Accordion';

const PackingList = () => {
	const [expandAll, setExpandAll] = useState(true);

	const { categorisedItems } = usePackingList();

	const handleToggleAll = (expand: boolean) => {
		setExpandAll(expand);
	};

	return (
		<div className="mt-20">
			{categorisedItems.length ? (
				<>
					<div className="flex justify-between items-center mb-4">
						<button
							onClick={() => handleToggleAll(true)}
							className="border font-bold py-2 px-4 rounded"
						>
							Expand All
						</button>
						<button
							onClick={() => handleToggleAll(false)}
							className="border font-bold py-2 px-4 rounded"
						>
							Collapse All
						</button>
					</div>
					<Accordion>
						{categorisedItems.map((category) => (
							<AccordionItem
								key={category._id}
								header={<CategoryHeader category={category} />}
								isOpen={expandAll}
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
				</>
			) : (
				<NoItems main='Your Festival Packing list' sub='Use the search bar to add items to your list' />
			)}
		</div>
	);
};

export default PackingList;
