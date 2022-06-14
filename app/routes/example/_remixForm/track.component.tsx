import { createTrack } from "~/remix-tracks";
import { z } from "zod";
import { Form } from "remix-forms";
import type { LoaderData } from "./track.server";

export const track = createTrack("remixform");

export const schema = z.object({
  name: z.string().trim(),
  address: z.string().trim(),
  phone: z.string().trim(),
  rating: z.number().min(0).max(5),
});

export const Track = () => {
  const { restaurant } = track.useLoaderData<LoaderData>();
  const action = track.useAction();

  return (
    <div>
      <h3>The remixForm tracks manages an action with remix-forms</h3>
      <Form schema={schema} values={restaurant} action={action} />
    </div>
  );
};
