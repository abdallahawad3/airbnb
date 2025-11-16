import Heading from "@/components/ui/Heading";
import ClientOnly from "../_clientOnly";
import { getFavorites } from "../actions/getFavorites";
import getCurrentUser from "../actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const currentUser = (await getCurrentUser()) || null;
  const listings = (await getFavorites()) ?? [];
  if (listings?.length == 0) {
    return (
      <ClientOnly>
        <Heading
          title="No Favorites found"
          subTitle="You have no favorite listings."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
