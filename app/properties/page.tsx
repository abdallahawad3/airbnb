import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../_clientOnly";
import PropertiesClient from "./PropertiesClient";
import { getListing } from "../actions/getListing";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You must be logged in to view this page."
        />
      </ClientOnly>
    );
  }

  const listings = (await getListing({ userId: currentUser.id })) ?? [];
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="You have no properties at the moment."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
