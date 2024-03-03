import { Type } from '@fastify/type-provider-typebox';
import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Prisma } from '@prisma/client';

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

    //profile: {type: ProfileType},
    //posts: {type:  new GraphQLList(Post)},       
    //userSubscribedTo: {type: new GraphQLList(SubscribersOnAuthors)},
    //subscribedToUser: {type:new GraphQLList(SubscribersOnAuthors)}
  }
})

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {type: MemberTypeId},
    discount: {type: GraphQLFloat},
    postsLimitPerMonth: {type: GraphQLInt},
    //profiles: {type: new GraphQLList(ProfileType)}
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
    // user: {type: UserType },
    // userId: { type: GraphQLString },
    // memberType: { type: MemberType },
    // memberTypeId: {type: GraphQLString}
  }
})

// const rootMutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {}
// });

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      // resolve(data) {
      //   return data //какая то дата должна быть...
      // }
    },
    posts: {
      type: new GraphQLList(Post),
     //resolve: ()=> {return Post}
    },
    users: {
      type: new GraphQLList(UserType),
      //resolve: ()=> {return }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      //resolve: ()=>{ return true}
    }
  }
})

export const SomeKindOfSchema = new GraphQLSchema({
  query: QueryType, 
  
}) 

function getMemberTypes() {
  return 
}