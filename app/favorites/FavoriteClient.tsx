import Container from "@/components/Container";
import Heading from "@/components/ui/Heading";
import ListingCard from "@/components/ui/listings/ListingCard";
import type { safeListing, safeUser } from "@/types";

interface FavoriteClientProps {
  listings: safeListing[];
  currentUser?: safeUser;
}

const FavoriteClient = ({ listings, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="Your favorite listings" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
