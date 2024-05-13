'use server';

import Modal from '../Modal/Modal';

const AddItemModal = async ({ newItemName }: { newItemName: string }) => {
	return (
		<Modal href="/">
			<form className="space-y-5">
				<h2 className="text-xl">Add a new item</h2>
				<div className="flex flex-col gap-1">
					<label htmlFor="newItemName">Name</label>
					<input
						id="newItemName"
						className="border py-2 px-3 rounded"
						type="text"
						defaultValue={newItemName}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="newItemCategory">Category</label>
					<select
						className="border py-2 px-3 rounded"
						name=""
						id="newItemCateogry"
					></select>
				</div>
				<div className="w-full flex justify-center">
					<button className="border p-3 rounded-sm">Add new item</button>
				</div>
			</form>
		</Modal>
	);
};

export default AddItemModal;
