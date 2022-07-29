import type { Post} from "@prisma/client";
import { PrismaClient } from "@prisma/client"
import { GraphQLClient, gql } from 'graphql-request'


const prisma = new PrismaClient()
const graphQLClient = new GraphQLClient('http://localhost:8000/v1/graphql')

export async function getPosts(): Promise<Array<Post>> {
    return prisma.post.findMany();
}

export type Posts = {
        Post_aggregate: {
          aggregate: {
            count: number
          },
          nodes: [
            {
              id: number,
              title: string
              content: string
              User: {
                name: string
                email: string
                Profile: {
                  bio: string
                }
              }
            }
          ]
    }
}

export async function getPostsGQL(): Promise<Posts> {
    const query = gql`
    {
        Post_aggregate(order_by: {createdAt: asc}) {
          aggregate {
            count
          }
          nodes {
            id
            title
            content
            User {
              name
              email
              Profile {
                bio
              }
            }
          }
        }
      }
      `
    return await graphQLClient.request(query)
}