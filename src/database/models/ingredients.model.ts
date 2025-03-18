import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IIngredients extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  name: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ingredientsSchema: Schema = new Schema<IIngredients>(
  {
    // <creating-property-schema />
    name: {
      type: String,
      index: 'text',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Ingredients',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(['deletedAt', '__v', '_id'], ret),
    },
  },
);

export default model<IIngredients>('Ingredients', ingredientsSchema);
