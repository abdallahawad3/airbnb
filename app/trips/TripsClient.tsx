"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import toast from "react-hot-toast";

import Container from "@/components/Container";
import Heading from "@/components/ui/Heading";
import type { safeReservation, safeUser } from "@/types";
import { AXIOS_INSTANCE } from "@/config/axios.config";
import ListingCard from "@/components/ui/listings/ListingCard";

interface TripsClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (reservationId: string) => {
    setDeletingId(reservationId);
    await AXIOS_INSTANCE.delete(`/reservations/${reservationId}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .finally(() => {
        setDeletingId("");
      });
  };
  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            currentUser={currentUser}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionId={reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
