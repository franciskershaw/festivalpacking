import {
	FaArrowRightToBracket,
	FaBeerMugEmpty,
	FaBurger,
	FaFloppyDisk,
	FaGuitar,
	FaListCheck,
	FaMobileScreen,
	FaPills,
	FaShirt,
	FaTent,
	FaToiletPaper,
} from 'react-icons/fa6';

interface IconProps {
	name: IconName;
	size: number;
}

const Icon = ({ name, size }: IconProps) => {
	const iconMap: { [key in IconName]: React.ComponentType<any> } = {
		FaArrowRightToBracket,
		FaBeerMugEmpty,
		FaBurger,
		FaFloppyDisk,
		FaGuitar,
		FaListCheck,
		FaMobileScreen,
		FaPills,
		FaShirt,
		FaTent,
		FaToiletPaper,
	};

	const IconComponent = iconMap[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent size={size} />;
};

export type IconName =
	| 'FaArrowRightToBracket'
	| 'FaBeerMugEmpty'
	| 'FaBurger'
	| 'FaFloppyDisk'
	| 'FaGuitar'
	| 'FaListCheck'
	| 'FaMobileScreen'
	| 'FaPills'
	| 'FaShirt'
	| 'FaTent'
	| 'FaToiletPaper';

export default Icon;