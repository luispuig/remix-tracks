import type {
  LoaderFunction,
  ActionFunction,
  DataFunctionArgs,
} from "@remix-run/node";
import { useLoaderData, useActionData, useFormAction } from "@remix-run/react";

type Response =
  | Record<string, any>
  | string
  | number
  | undefined
  | null
  | any[];
type TrackLoader = (args: DataFunctionArgs) => Response | Promise<Response>;

export interface TrackLoaderFunction extends TrackLoader {
  id: string;
}

export interface TrackActionFunction extends ActionFunction {
  id: string;
}

export interface Track {
  loader?: TrackLoaderFunction;
  action?: TrackActionFunction;
}

export const createTrack = (id: string) => {
  return {
    id,

    createLoader: (loader: TrackLoader) => {
      const RemixComponentLoaderFunction = loader as TrackLoaderFunction;
      RemixComponentLoaderFunction.id = id;
      return RemixComponentLoaderFunction;
    },

    createAction: (action: ActionFunction) => {
      const RemixComponentActionFunction = action as TrackActionFunction;
      RemixComponentActionFunction.id = id;
      return RemixComponentActionFunction;
    },

    useLoaderData: <T>() => useLoaderData()[id] as T,
    useActionData: <T>() => useActionData()?.[id] as T | undefined,

    useAction: () => {
      const baseAction = useFormAction(".");
      const idParams = new URLSearchParams();
      idParams.append("track", id);
      const action = `${baseAction}${
        baseAction.includes("?") ? "&" : "?"
      }${idParams.toString()}`;
      return action;
    },

    response: (data: Response) => ({ [id]: data }),
  };
};

export const mixLoaders = (loaders: TrackLoaderFunction[]) => {
  const loader: LoaderFunction = async (data) => {
    const promises = loaders.map((loader) => loader(data));
    const values = await Promise.all(promises);
    return values.reduce<Record<string, Response>>((acc, value, index) => {
      const trackId = loaders[index].id;
      if (Object.keys(acc).includes(trackId)) {
        throw new Error(`Duplicate track id: ${trackId}`);
      }
      return { ...acc, [trackId]: value };
    }, {});
  };
  return loader;
};

export const mixActions = (actions: TrackActionFunction[]) => {
  const action: ActionFunction = (data) => {
    const url = new URL(data.request.url);
    const track = url.searchParams.get("track");
    const action = actions.find((action) => action.id === track);
    if (action !== undefined) {
      return action(data);
    }
    throw new Error(`Track ${track} not found`);
  };

  return action;
};

export const mixTracks = (tracks: Track[]) => {
  const loaders = tracks
    .map((track) => track.loader)
    .filter((loader): loader is TrackLoaderFunction => loader !== undefined);

  const loader: LoaderFunction = mixLoaders(loaders);

  const actions = tracks
    .map((track) => track.action)
    .filter((action): action is TrackActionFunction => action !== undefined);

  const action: ActionFunction = mixActions(actions);

  return { loader, action };
};
