import { useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node";
import { getPostsGQL } from "~/models/posts.server";

type LoaderData = {
    posts: Awaited<ReturnType<typeof getPostsGQL>>;
  };

  export const loader = async () => {
    return json<LoaderData>({
      posts: await getPostsGQL(),
    });
  };

export default function Posts() {
    const { posts } = useLoaderData() as unknown as LoaderData
    return (
        <main>
            <h1>Posts</h1>
            <ul>                
                {posts.Post_aggregate.nodes.map((posts) => (
                    <li key={posts.id}>
                        <h2>Title: {posts.title}</h2>
                        <p>Content: {posts.content}</p>
                        <p>Written by: {posts.User.name}, {posts.User.name}</p>
                        <p>Stated to be: {posts.User.Profile.bio}</p>
                    </li>
                ))}                
            </ul>
        <h3>Total posts: {posts.Post_aggregate.aggregate.count}</h3>            
        </main>
    )
}