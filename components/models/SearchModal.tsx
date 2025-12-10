/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import qs from "query-string";
import { onCloseSearchModal } from "@/redux/features/search/searchSlice";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { Range } from "react-date-range";
import dynamic from "next/dynamic";
import type { CountrySelectValue } from "../ui/inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../ui/Heading";
import CountrySelect from "../ui/inputs/CountrySelect";
import Calender from "../ui/Calender/Calender";
import Counter from "../ui/inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const dispatch = useAppDispatch();
  const { isOpenSearchModal } = useAppSelector((state) => state.search);
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setSteps((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setSteps((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );

    setSteps(STEPS.LOCATION);
    dispatch(onCloseSearchModal());
    router.push(url);
  }, [
    steps,
    onNext,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    router,
    dispatch,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  let BodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Filters" subTitle="Search your perfect home!" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />

      <Map center={location?.latlng as [number, number] | undefined} />
    </div>
  );

  if (steps === STEPS.DATE) {
    BodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subTitle="Pick a date" />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    BodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect home!" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={
        steps === STEPS.LOCATION ? undefined : secondaryActionLabel
      }
      secondaryAction={secondaryActionLabel ? onBack : undefined}
      title="Filters"
      isOpen={isOpenSearchModal}
      onClose={() => {
        dispatch(onCloseSearchModal());
      }}
      onSubmit={onSubmit}
      body={BodyContent}
    />
  );
};

export default SearchModal;
