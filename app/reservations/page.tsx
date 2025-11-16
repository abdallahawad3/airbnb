import EmptyState from "@/components/EmptyState";
import ClientOnly from "../_clientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationClient from "./ReservationClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to view your reservations"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="You have no reservations at the moment"
        />
      </ClientOnly>
    );
  }

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default page;
