'use client';

import CategoryHeader from './CategoryHeader';
import usePackingList from './usePackingList';

import Accordion, { AccordionItem } from '../Accordion/Accordion';

const PackingList = () => {
	const { categorisedItems } = usePackingList();

	return (
		<>
			{categorisedItems.length ? (
				<Accordion>
					{categorisedItems.map((category) => (
						<AccordionItem
							key={category._id}
							header={<CategoryHeader category={category} />}
							openByDefault
						>
							<ul>
								{category.items.map((item) => (
									<li key={item._id}>{item.name}</li>
								))}
							</ul>
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<div>No items</div>
			)}
		</>
	);
};

export default PackingList;
