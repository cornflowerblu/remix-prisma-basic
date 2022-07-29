import { GraphQLClient, gql } from 'graphql-request'


// const prisma = new PrismaClient()
// export async function getPosts(): Promise<Array<Post>> {
//     return prisma.post.findMany();
// }

const graphQLClient = new GraphQLClient('http://localhost:8000/v1/graphql')


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

export async function getPostsGQL(sortParams: string, sortOrder: string): Promise<Posts> {
    const query = gql`
    {
        Post_aggregate(order_by: {${sortParams}: ${sortOrder}}) {
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