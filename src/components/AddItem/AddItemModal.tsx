'use server';

import { getItemCategories } from '@/server/items';
import { createItem } from '@/server/items';
import { Category } from '@/utils/types';

import Modal from '../Modal/Modal';

const AddItemModal = async ({ newItemName }: { newItemName: string }) => {
	const res = await getItemCategories();
	const data = res?.data;

	return (
		<Modal href="/">
			<form action={createItem} className="space-y-5">
				<h2 className="text-xl">Add a new item</h2>
				<div className="flex flex-col gap-1">
					<label htmlFor="newItemName">Name</label>
					<input
						id="newItemName"
						name="newItemName"
						className="border py-2 px-3 rounded"
						type="text"
						defaultValue={newItemName}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="newItemCategory">Category</label>
					<select
						className="border py-2 px-3 rounded"
						id="newItemCategory"
						name="newItemCategory"
					>
						{data?.map((category: Category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className="w-full flex justify-center">
					<button className="border p-3 rounded-sm">Add new item</button>
				</div>
			</form>
		</Modal>
	);
};

export default AddItemModal;
