/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipes management and retrieval
 */

/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a recipes
 *     description: ADMIN can create recipes.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createRecipes'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Recipes'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all recipes
 *     description: USER,ADMIN can retrieve all recipes.
 *     tags: [Recipes]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of recipes
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Recipes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a recipes
 *     description: USER,ADMIN can use this router.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipes id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Recipes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a recipes
 *     description:  can use this router.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipes id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateRecipes'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                     $ref: '#/components/schemas/Recipes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  recipes.
 *     description:  can use this router.
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipes id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

export const Recipes = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    categ: { type: 'string' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          //  properties ingredients
          ingredientId: { type: 'string' },

          quantity: { type: 'string' },
        },
      },
    },
    servings: { type: 'number' },
    cookingTime: { type: 'string' },
    preparationTime: { type: 'string' },
    instructions: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'array', items: { type: 'string' } },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    categId: '673c40cd59e293827f79e398',

    ingredients: [
      {
        // property example ingredients
        ingredientIdIds: [
          '673c40cd59e293827f79e398',
          '673c40cd59e293827f79e399',
        ],

        quantity: '2 cups',
      },
    ],

    servings: 4,

    cookingTime: '45 minutes',

    preparationTime: '30 minutes',

    instructions: 'Step-by-step instructions',

    description: 'any description',

    title: ['shakalmhshe'],

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
export const createRecipes = {
  type: 'object',
  properties: {
    // create property
    categ: { type: 'string' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          //  create  properties ingredients
          ingredientId: { type: 'string' },

          quantity: { type: 'string' },
        },
      },
    },
    servings: { type: 'number' },
    cookingTime: { type: 'string' },
    preparationTime: { type: 'string' },
    instructions: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'array', items: { type: 'string' } },
  },
  example: {
    // create property example
    categId: '673c40cd59e293827f79e398',

    ingredients: [
      {
        // create property example ingredients
        ingredientIdIds: [
          '673c40cd59e293827f79e398',
          '673c40cd59e293827f79e399',
        ],

        quantity: '2 cups',
      },
    ],

    servings: 4,

    cookingTime: '45 minutes',

    preparationTime: '30 minutes',

    instructions: 'Step-by-step instructions',

    description: 'any description',

    title: ['shakalmhshe'],

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
  required: [
    // required property
    'categ',

    'ingredients.quantity',

    'servings',

    'cookingTime',

    'preparationTime',

    'description',
  ],
};
export const updateRecipes = {
  type: 'object',
  properties: {
    // update property
    categ: { type: 'string' },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          //  update properties ingredients
          ingredientId: { type: 'string' },

          quantity: { type: 'string' },
        },
      },
    },
    servings: { type: 'number' },
    cookingTime: { type: 'string' },
    preparationTime: { type: 'string' },
    instructions: { type: 'string' },
    description: { type: 'string' },
    title: { type: 'array', items: { type: 'string' } },
  },
  example: {
    // update property example
    categId: '673c40cd59e293827f79e398',

    ingredients: [
      {
        // update property example ingredients
        ingredientIdIds: [
          '673c40cd59e293827f79e398',
          '673c40cd59e293827f79e399',
        ],

        quantity: '2 cups',
      },
    ],

    servings: 4,

    cookingTime: '45 minutes',

    preparationTime: '30 minutes',

    instructions: 'Step-by-step instructions',

    description: 'any description',

    title: ['shakalmhshe'],

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
