import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
	name: {
		type: String,
		unique: [true, 'Item name already exists'],
		required: [true, 'Name is required'],
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'ItemCategory',
		required: [true, 'Category is required'],
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	approved: {
		type: Boolean,
		default: false,
	},
});

const Item = models.Item || model('Item', ItemSchema);

export default Item;
