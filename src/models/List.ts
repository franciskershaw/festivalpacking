import { Schema, model, models } from 'mongoose';

const ListSchema = new Schema({
  name: {
    type: String,
    unique: [true, 'Item category already exists'],
    required: [true, 'Name is required'],
  },
  items: {
    type: [
      {
        _id: Schema.Types.ObjectId,
        obtained: Boolean,
      },
    ],
    required: true,
    default: [],
  },
});

const List = models.List || model('List', ListSchema);

export default List;
