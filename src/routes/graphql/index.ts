import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { SomeKindOfSchema, createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const {prisma} = fastify
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
      const source = req.body.query;
      const variables = req.body.variables;
      const root = {
        profiles: await prisma.profile.findMany(),
        memberTypes: prisma.memberType.findMany(),
        posts: prisma.post.findMany(),
        users: prisma.user.findMany()
      } 
      return graphql({
        schema: SomeKindOfSchema,
        source: source,
        rootValue: root,
        variableValues: variables,
      })
    },
  });
};

export default plugin;
