import {
	FaArrowDownWideShort,
	FaArrowRightToBracket,
	FaArrowUpWideShort,
	FaBeerMugEmpty,
	FaBurger,
	FaCheck,
	FaChevronDown,
	FaFloppyDisk,
	FaGuitar,
	FaListCheck,
	FaMobileScreen,
	FaPenToSquare,
	FaPills,
	FaPlus,
	FaShirt,
	FaTent,
	FaToiletPaper,
	FaTrashCan,
} from 'react-icons/fa6';

interface IconProps {
	name: IconName;
	size: number;
}

const Icon = ({ name, size }: IconProps) => {
	const iconMap: { [key in IconName]: React.ComponentType<any> } = {
		FaArrowDownWideShort,
		FaArrowRightToBracket,
		FaArrowUpWideShort,
		FaChevronDown,
		FaBeerMugEmpty,
		FaBurger,
		FaCheck,
		FaFloppyDisk,
		FaGuitar,
		FaListCheck,
		FaMobileScreen,
		FaPenToSquare,
		FaPills,
		FaPlus,
		FaShirt,
		FaTent,
		FaToiletPaper,
		FaTrashCan,
	};

	const IconComponent = iconMap[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent size={size} />;
};

export type IconName =
	| 'FaArrowDownWideShort'
	| 'FaArrowRightToBracket'
	| 'FaArrowUpWideShort'
	| 'FaChevronDown'
	| 'FaBeerMugEmpty'
	| 'FaCheck'
	| 'FaBurger'
	| 'FaFloppyDisk'
	| 'FaGuitar'
	| 'FaListCheck'
	| 'FaMobileScreen'
	| 'FaPenToSquare'
	| 'FaPills'
	| 'FaPlus'
	| 'FaShirt'
	| 'FaTent'
	| 'FaToiletPaper'
	| 'FaTrashCan';

export default Icon;
