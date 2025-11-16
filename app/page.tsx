import Container from "@/components/Container";
import ClientOnly from "./_clientOnly";
import EmptyState from "@/components/EmptyState";
import { getListing } from "./actions/getListing";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "@/components/ui/listings/ListingCard";

const page = async () => {
  const listing = await getListing();
  const currentUser = await getCurrentUser();
  if (listing?.length === 0) {
    return (
      <ClientOnly>
        <Container>
          <EmptyState showRest />
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {listing?.map((item) => (
            <ListingCard key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default page;
