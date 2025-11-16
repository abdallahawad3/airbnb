"use client";
import Container from "@/components/Container";
import Categories, { CATEGORIES } from "@/components/navbar/Categories";
import ListingHead from "@/components/ui/listings/ListingHead";
import ListingInfo from "@/components/ui/listings/ListingInfo";
import type { safeListing, safeUser } from "@/types";
import type { Reservation } from "@prisma/client";
import { useMemo, type FC } from "react";

interface ListingClientProps {
  listing: safeListing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
  reservations?: Reservation[];
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return CATEGORIES.find(
      (item) =>
        item.label.toLocaleLowerCase() === listing.category.toLocaleLowerCase()
    );
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            locationValue={listing.locationValue}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              category={category}
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
