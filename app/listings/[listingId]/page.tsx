import ClientOnly from "@/app/_clientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const { listingId } = await params;
  const currentUser = await getCurrentUser();
  const listing = await getListingById(listingId);
  if (!listing) {
    return (
      <ClientOnly>
        <Container>
          <EmptyState />
        </Container>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
