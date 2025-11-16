"use client";

import type { Range as DateRange } from "react-date-range";
import Calender from "../Calender/Calender";
import MyButton from "../MyButton";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: DateRange) => void;
  dateRange: DateRange;
  disabled?: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
}

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  disabled,
  disabledDates,
  onSubmit,
}: ListingReservationProps) => {
  return (
    <div
      className="
  bg-white rounded-xl border border-neutral-200 overflow-hidden
  "
    >
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />
      <div className="p-4">
        <MyButton onClick={onSubmit} disabled={disabled} label="Reserve" />
      </div>
      <div className="py-4 flex items-center justify-between text-lg font-semibold">
        <div className="pl-4">Total</div>
        <div className="pr-4">$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
