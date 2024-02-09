import useSWR from "swr";
import { InferRequestType, hc } from "hono/client";
import type { MetaFunction } from "@remix-run/cloudflare";
import { AppType } from "functions/api/[[route]]";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const client = hc<AppType>("/");
  const $get = client.api.posts.index.$get;

  const fetcher = (arg: InferRequestType<typeof $get>) => async () => {
    const res = await $get(arg);
    return await res.json();
  };

  const { data, error, isLoading } = useSWR(
    "posts",
    fetcher({
      query: {},
    })
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {data?.map((post, index) => (
        <div key={index}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}
