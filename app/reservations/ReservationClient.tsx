"use client";
import type { safeReservation, safeUser } from "@/types";
import Heading from "@/components/ui/Heading";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AXIOS_INSTANCE } from "@/config/axios.config";
import toast from "react-hot-toast";
import ListingCard from "@/components/ui/listings/ListingCard";

interface ReservationClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser;
}
const ReservationClient = ({
  reservations,
  currentUser,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const onCancel = async (reservationId: string) => {
    setDeleteId(reservationId);

    await AXIOS_INSTANCE.delete(`/reservations/${reservationId}`)
      .then(() => {
        toast.success("Reservation deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setDeleteId("");
      });
  };
  return (
    <Container>
      <Heading title="Reservations" subTitle="Manage your reservations" />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-10">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            currentUser={currentUser}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
