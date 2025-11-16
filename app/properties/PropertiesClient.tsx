"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";

import Container from "@/components/Container";
import Heading from "@/components/ui/Heading";
import type { safeListing, safeUser } from "@/types";
import { AXIOS_INSTANCE } from "@/config/axios.config";
import ListingCard from "@/components/ui/listings/ListingCard";

interface PropertiesClientProps {
  listings: safeListing[];
  currentUser?: safeUser;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (reservationId: string) => {
    setDeletingId(reservationId);
    await AXIOS_INSTANCE.delete(`/listings/${reservationId}`)
      .then(() => {
        toast.success("Property deleted");
        router.refresh();
      })
      .finally(() => {
        setDeletingId("");
      });
  };
  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionId={listing.id}
            actionLabel="Delete Propriety"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
