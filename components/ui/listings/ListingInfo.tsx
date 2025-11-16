"use client";

import Avatar from "@/components/Avatar";
import { useCountries } from "@/hooks/useCountries";
import type { safeUser } from "@/types";
import type { FC } from "react";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import type { IconType } from "react-icons";
const Map = dynamic(() => import("../../Map"), { ssr: false });
interface ListingInfoProps {
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  description: string;
  locationValue: string;
  user: safeUser | undefined;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}
const ListingInfo: FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  if (!user) {
    return null;
  }

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <div>Hosted by {(user?.name ?? "Unknown").toLocaleUpperCase()}</div>
          <Avatar image={`${user?.image}`} />
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          {" "}
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
