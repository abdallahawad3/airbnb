"use client";
import Container from "@/components/Container";
import { CATEGORIES } from "@/components/navbar/Categories";
import ListingHead from "@/components/ui/listings/ListingHead";
import ListingInfo from "@/components/ui/listings/ListingInfo";
import ListingReservation from "@/components/ui/listings/ListingReservation";
import { AXIOS_INSTANCE } from "@/config/axios.config";
import { useAppDispatch } from "@/hooks/redux";
import { onOpenLoginModal } from "@/redux/features/login/loginSlice";
import type { safeListing, safeReservation, safeUser } from "@/types";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import type { Range } from "react-date-range";
import toast from "react-hot-toast";

interface ListingClientProps {
  listing: safeListing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
  reservations?: safeReservation[];
}

const initialDate: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDate);
  const dispatch = useAppDispatch();

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return dispatch(onOpenLoginModal());
    }
    AXIOS_INSTANCE.post("/reservations", {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id,
    }).then(() => {
      toast.success("Reservation created successfully!");
      setDateRange(initialDate);

      router.push("/trips");
    });
  }, [currentUser, dispatch, totalPrice, dateRange, listing.id, router]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
