import { createTrack } from "~/remix-tracks";

import type { LoaderData } from "./track.server";

export const track = createTrack("onlyLoader");

export const Track = () => {
  const { data } = track.useLoaderData<LoaderData>();
  return (
    <div>
      <h3>The onlyLoader tracks shows information from the loader</h3>
      <p>
        <b>Now from loader: </b>
        {data.now}
      </p>
    </div>
  );
};
