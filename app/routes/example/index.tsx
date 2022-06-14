import { mixTracks } from "~/remix-tracks";
import * as onlyLoaderTrack from "./_onlyLoader";
import * as remixFormTrack from "./_remixForm";
import * as manualFormTrack from "./_manualForm";

export const { loader, action } = mixTracks([
  onlyLoaderTrack,
  remixFormTrack,
  manualFormTrack,
]);

export default function Index() {
  return (
    <div>
      This page is made mixing different remix-tracks:
      <hr />
      <onlyLoaderTrack.Track />
      <hr />
      <remixFormTrack.Track />
      <hr />
      <manualFormTrack.Track />
      <hr />
    </div>
  );
}
