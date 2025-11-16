import Heading from "@/components/ui/Heading";
import ClientOnly from "../_clientOnly";
import { getFavorites } from "../actions/getFavorites";
import getCurrentUser from "../actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavorites();
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
      <Heading
        title="Favorites"
        subTitle="Looks like you have no favorite listings."
      />

      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
