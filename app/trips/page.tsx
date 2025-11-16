import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../_clientOnly";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

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

  const reservations = await getReservation({ userId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="You have no reservations at the moment."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
