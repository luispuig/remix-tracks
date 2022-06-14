import { createTrack } from "~/remix-tracks";
import type { LoaderData, ActionData } from "./track.server";
import { Form } from "@remix-run/react";

export const track = createTrack("manualform");

export const Track = () => {
  const { post } = track.useLoaderData<LoaderData>();
  const action = track.useAction();
  const actionData = track.useActionData<ActionData>();

  return (
    <div>
      <h3>The manualForm tracks manages an action manually</h3>
      <Form method="post" action={action}>
        <label>
          <span>Title: </span>
          <input
            name="title"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
            defaultValue={post?.title}
          />
        </label>
        {actionData?.errors?.title && (
          <div id="title-error">{actionData.errors.title}</div>
        )}

        <div className="text-right">
          <button type="submit">Save</button>
        </div>
      </Form>
    </div>
  );
};
