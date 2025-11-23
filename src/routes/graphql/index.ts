import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';
import { createSchema } from './schema.js';
import { createDataLoaders } from './dataloader.js';
import { execute, parse, validate } from 'graphql';

const GRAPHQL_DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const schema = createSchema(prisma);

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const document = parse(query);
      const validationErrors = validate(schema, document, [depthLimit(GRAPHQL_DEPTH_LIMIT)]);

      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      const dataLoaders = createDataLoaders(prisma);

      return execute({
        schema,
        document,
        variableValues: variables,
        contextValue: { dataLoaders },
      });
    },
  });
};

export default plugin;
