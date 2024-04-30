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
});

const Item = models.Item || model('Item', ItemSchema);

export default Item;
