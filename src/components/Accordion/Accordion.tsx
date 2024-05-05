import { FC, ReactNode, useState } from 'react';

import { motion } from 'framer-motion';

import Icon from '../Icon/Icon';

interface AccordionItemProps {
	header: string | ReactNode;
	children: ReactNode;
	openByDefault?: boolean;
}

export const AccordionItem: FC<AccordionItemProps> = ({
	header,
	children,
	openByDefault = false,
}) => {
	const [isAccordionOpen, setIsAccordionOpen] =
		useState<boolean>(openByDefault);

	const toggleAccordion = () => setIsAccordionOpen((prev) => !prev);

	const handleHeaderClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		event.stopPropagation();
	};

	return (
		<div className="flex flex-col">
			<div
				className={`flex justify-between items-center p-4 cursor-pointer border`}
				onClick={toggleAccordion}
			>
				<div className='font-semibold' onClick={handleHeaderClick}>{header}</div>
				<motion.div
					animate={{ rotate: isAccordionOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<Icon name="FaChevronDown" size={20} />
				</motion.div>
			</div>
			{isAccordionOpen && (
				<div className="border p-4 overflow-hidden">{children}</div>
			)}
		</div>
	);
};

export interface AccordionProps {
	children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ children }) => {
	return <div className="border">{children}</div>;
};

export default Accordion;
