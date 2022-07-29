import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";
import { getPostsGQL } from "~/models/posts.server";

// TODO make thes enterable dynamically by route params or fall back to a default
export enum OrderOptions {
    'asc',
    'desc',
    false
  }

// TODO make thes enterable dynamically by route params or fall back to a default  
export type PostOrderByParams = {
    createdAt: string
    authorId: string
    published: string
  }

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostsGQL>>;
  };

export const loader = async () => {
    return json<LoaderData>({
        posts: await getPostsGQL('createdAt', 'desc'),
    });
};

export default function Posts() {
    const { posts } = useLoaderData() as LoaderData
    return (
        <main>
            <h1>Posts</h1>
            <ul>                
                {posts.Post_aggregate.nodes.map((posts) => (
                    <li key={posts.id}>
                        <h2>Title: {posts.title}</h2>
                        <p>Content: {posts.content}</p>
                        <p>Written by: {posts.User.name}, {posts.User.email}</p>
                        <p>Stated to be: {posts.User.Profile?.bio || 'No bio found! ):'}</p>
                    </li>
                ))}                
            </ul>
        <h3>Total posts: {posts.Post_aggregate.aggregate.count}</h3>
        </main>
    )
}