import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { UUIDType } from './types/uuid.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'basic'
    },
    BUSINESS: {
      value: 'business'
    },
  }
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {type: new GraphQLNonNull(UUIDType)},
    name: {type: GraphQLString},
    balance: {type: GraphQLFloat},
  }
})

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {type: MemberTypeId},
    discount: {type: GraphQLFloat},
    postsLimitPerMonth: {type: GraphQLInt},
  }
});

const Post = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: {type: new GraphQLNonNull(UUIDType)},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
  }
})

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: {type: GraphQLBoolean},
    yearOfBirth: { type: GraphQLInt },
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType), 
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
    },
    posts: {
      type: new GraphQLList(Post),
     
    },
    users: {
      type: new GraphQLList(UserType),
      
    },
    profiles: {
      type: new GraphQLList(ProfileType),
     
    }
  }
})

export const SomeKindOfSchema = new GraphQLSchema({
  query: QueryType, 
  
}) 
