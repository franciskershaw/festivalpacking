'use client';

import { useState } from 'react';

import { useList } from '@/providers/ListContext';

import CategoryHeader from './CategoryHeader';
import NoItems from './NoItems';
import PackingListItem from './PackingListItem';
import usePackingList from './usePackingList';

import Accordion, { AccordionItem } from '../Accordion/Accordion';
import Icon from '../Icon/Icon';

const PackingList = () => {
	const [expandAll, setExpandAll] = useState(true);

	const { categorisedItems } = usePackingList();

	const { state, clearListState } = useList();

	const handleToggleAll = (expand: boolean) => {
		setExpandAll(expand);
	};

	return (
		<div className="mt-20">
			<div className="flex justify-between items-center mb-4 text-sm md:text-base">
				{state.festivalId ? (
					<button
						onClick={() => clearListState()}
						className="border font-bold py-2 px-4 rounded flex items-center gap-2"
					>
						<span>New</span>
						<Icon size={16} name="FaPlus" />
					</button>
				) : null}
				{categorisedItems.length ? (
					<>
						<button
							onClick={() => handleToggleAll(true)}
							className="border font-bold py-2 px-4 rounded flex items-center gap-2"
						>
							<span>Expand</span>
							<Icon size={16} name="FaArrowUpWideShort" />
						</button>
						<button
							onClick={() => handleToggleAll(false)}
							className="border font-bold py-2 px-4 rounded flex items-center gap-2"
						>
							<span>Collapse</span>
							<Icon size={16} name="FaArrowDownWideShort" />
						</button>
					</>
				) : null}
			</div>
			{categorisedItems.length ? (
				<>
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
				<NoItems
					main="Your Festival Packing list"
					sub="Use the search bar to add items to your list"
				/>
			)}
		</div>
	);
};

export default PackingList;
