import { Schema, model, models } from 'mongoose';

const ListSchema = new Schema(
	{
		name: {
			type: String,
			unique: [true, 'Item category already exists'],
			required: [true, 'Name is required'],
		},
		items: {
			type: [
				{
					_id: {
						type: Schema.Types.ObjectId,
						ref: 'Item',
					},
					obtained: Boolean,
				},
			],
			required: true,
			default: [],
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const List = models.List || model('List', ListSchema);

export default List;
