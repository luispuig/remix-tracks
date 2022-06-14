import { InputError, makeDomainFunction } from "remix-domains";
import { formAction } from "remix-forms";
import { schema, track } from "./track.component";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
}

export type LoaderData = { restaurant: Restaurant };

export const loader = track.createLoader(async () => {
  const restaurant = {
    id: 1,
    name: "Res " + new Date().getTime(),
    address: "Address 1234",
    phone: "666777888",
    rating: 3,
  };

  return { restaurant } as LoaderData;
});

const mutation = makeDomainFunction(schema)(async (values) => {
  if (values.name?.match(/error/i)) {
    // server error
    throw new InputError("Server error", "name");
  }
  console.log("Restaurant SAVED", values);
  return {};
});

export const action = track.createAction(async ({ request }) =>
  formAction({ request, schema, mutation })
);
