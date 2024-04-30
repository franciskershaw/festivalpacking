import { Schema, model, models } from 'mongoose';

const ItemCategorySchema = new Schema({
	name: {
		type: String,
		unique: [true, 'Item category already exists'],
		required: [true, 'Name is required'],
	},
	faIcon: {
		type: String,
		unique: [true, 'Icon already in use'],
		required: [true, 'Icon is required'],
	},
});

const ItemCategory =
	models.ItemCategory || model('ItemCategory', ItemCategorySchema);

export default ItemCategory;
