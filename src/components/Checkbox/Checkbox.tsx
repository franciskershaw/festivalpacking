import { useState } from 'react';

import { motion } from 'framer-motion';

interface CheckboxProps {
	checkedByDefault?: boolean;
	onChange?: (checked: boolean) => boolean;
}

const Checkbox = ({ checkedByDefault = false, onChange }: CheckboxProps) => {
	const [checked, setChecked] = useState(checkedByDefault);

	const handleClick = () => {
		setChecked((prev) => !prev);
		if (onChange) onChange(!checked);
	};

	return (
		<div className="inline-block cursor-pointer" onClick={handleClick}>
			<div
				className={`w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all duration-200 ${
					checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
				}`}
			>
				{checked && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.2 }}
						className="w-5 h-5 text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							className="w-full h-full"
						>
							<path
								d="M9 16.2l-3.5-3.5-1.4 1.4 4.9 4.9 10-10-1.4-1.4z"
								fill="white"
							/>
						</svg>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default Checkbox;
