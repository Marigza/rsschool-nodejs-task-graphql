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
      //return await prisma.memberType.findMany()
      const source = req.body.query;
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
      })
      //   .then((res) => {
        
      //   console.log('stupid girl from prisma', root.profiles.length )
      //   console.log(`stupid girl res`, JSON.stringify(res))
      //   //console.log(`stupid girl error`, JSON.stringify(res.errors))
      //   return res;
      // })
      //   .catch(error => console.log(error))
      //return {};
      console.log('stupid girl source', source)
      //console.log('stupid girl2', prisma.memberType.findMany())
    },
  });
};

export default plugin;


// [
//   {
//     "message": "Invalid UUID.",
//     "locations": [{ "line": 3, "column": 13 }],
//     "path": ["memberTypes", 0, "id"]
//   },
//   {
//     "message": "Invalid UUID.",
//     "locations": [{ "line": 3, "column": 13 }],
//     "path": ["memberTypes", 1, "id"]
//   }
// ]