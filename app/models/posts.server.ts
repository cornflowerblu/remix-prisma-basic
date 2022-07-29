import { GraphQLClient, gql } from 'graphql-request'

const graphQLClient = new GraphQLClient('http://localhost:8000/v1/graphql')

export type PostAggregate = {
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
                id: string
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

export async function getPostsGQL(sortParams: string, sortOrder: string): Promise<PostAggregate> {
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
              id
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