interface TextInputProps {
	placeholder?: string;
	onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};

	return (
		<input
			className="py-2 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
			type="text"
			placeholder={placeholder}
			onChange={handleChange}
		/>
	);
};

export default TextInput;
