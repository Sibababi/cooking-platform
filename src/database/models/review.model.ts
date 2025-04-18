import { IRecipes } from './recipes.model';

import { IUser } from './user.model';

import mongoose from 'mongoose';

import { model, Schema, type Document as MongooseDocument } from 'mongoose';
import { omit } from 'lodash';

export interface IReview extends MongooseDocument {
  id: string;
  // <creating-property-interface />
  recipeId: IRecipes['_id'];
  recipe: IRecipes;

  cutomerId: IUser['_id'];
  cutomer: IUser;

  comment: string;

  rating: number;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const reviewSchema: Schema = new Schema<IReview>(
  {
    // <creating-property-schema />
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipes',
    },

    cutomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'Review',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => omit( ret, ['deletedAt', '__v', '_id']),
    },
  },
);

export default model<IReview>('Review', reviewSchema);
