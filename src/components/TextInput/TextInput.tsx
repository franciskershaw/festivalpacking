interface TextInputProps {
	placeholder?: string;
}

const TextInput = ({ placeholder }: TextInputProps) => {
	return (
		<input
			className="text-lg py-2 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-none"
			type="text"
			placeholder={placeholder}
		/>
	);
};

export default TextInput;
