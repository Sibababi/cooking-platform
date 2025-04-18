import { ICategurie } from './categurie.model';

import { IIngredients } from './ingredients.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IIng extends MongooseDocument {
  // <creating-property-interface-ing />
  ingrId: IIngredients['_id'];
  ingr: IIngredients;

  count: number;
}

export interface IRecipes extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  ing: IIng[];

  description: string;

  instructions: string;

  preparationTime: string;

  cookingTime: string;

  srevings: string;

  categId: ICategurie['_id'];
  categ: ICategurie;

  title: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const recipesSchema: Schema = new Schema<IRecipes>(
  {
    // <creating-property-schema />
    ing: [
      {
        // <creating-property-object-ing />
        ingrId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredients',
        },

        count: {
          type: Number,
        },
      },
    ],

    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    preparationTime: {
      type: String,
    },
    cookingTime: {
      type: String,
    },
    srevings: {
      type: String,
    },
    categId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categurie',
    },

    title: {
      type: String,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Recipes',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit(ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<IRecipes>('Recipes', recipesSchema);
