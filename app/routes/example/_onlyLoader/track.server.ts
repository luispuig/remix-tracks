import { track } from "./track.component";

export type LoaderData = {
  data: {
    now: string;
  };
};

export const loader = track.createLoader(async ({ request }) => {
  return { data: { now: new Date().toISOString() } } as LoaderData;
});
