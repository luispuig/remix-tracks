import { json } from "@remix-run/node";
import { track } from "./track.component";

interface Post {
  id: number;
  title: string;
}

export type LoaderData = { post: Post };

export const loader = track.createLoader(async () => {
  const post = {
    id: 1,
    title: "Title " + new Date().getTime(),
  };
  return { post } as LoaderData;
});

export type ActionData = {
  errors?: {
    title?: string;
  };
};

export const action = track.createAction(async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("title");

  if (typeof name !== "string" || name.length === 0) {
    return json<ActionData>(
      track.response({ errors: { title: "Title is required" } }),
      { status: 400 }
    );
  }

  return json<ActionData>({});
});
