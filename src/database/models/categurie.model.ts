import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface ICategurie extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  descreption: string;

  image: string;

  name: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const categurieSchema: Schema = new Schema<ICategurie>(
  {
    // <creating-property-schema />
    descreption: {
      type: String,
    },
    image: {
      type: String,
    },

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
    collection: 'Categurie',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit( ret , ['deletedAt', '__v', '_id'],),
    },
  },
);

export default model<ICategurie>('Categurie', categurieSchema);
