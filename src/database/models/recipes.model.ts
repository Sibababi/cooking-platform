import { ICategurie } from './categurie.model';

import { IIngredients } from './ingredients.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IIngredient extends MongooseDocument {
  // <creating-property-interface-ingredients />
  ingredientIdIds: Array<IIngredients['_id']>;
  ingredientId: Array<IIngredients>;

  quantity: string;
}

export interface IRecipes extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  categId: ICategurie['_id'];
  categ: ICategurie;

  ingredient: IIngredient[];

  servings: number;

  cookingTime: string;

  preparationTime: string;

  instructions: string;

  description: string;

  title: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const recipesSchema: Schema = new Schema<IRecipes>(
  {
    // <creating-property-schema />
    categId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categurie',
    },

    ingredient: [
      {
        // <creating-property-object-ingredients />
        ingredientIdIds: {
          type: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Ingredients',
              default: [],
            },
          ],
        },

        quantity: {
          type: String,
        },
      },
    ],

    servings: {
      type: Number,
    },
    cookingTime: {
      type: String,
    },
    preparationTime: {
      type: String,
    },
    instructions: {
      type: String,
    },
    description: {
      type: String,
    },
    title: [
      {
        type: String,
        index: 'text',
      },
    ],

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
      transform: (_, ret) => omit(['deletedAt', '__v', '_id'], ret),
    },
  },
);

export default model<IRecipes>('Recipes', recipesSchema);
