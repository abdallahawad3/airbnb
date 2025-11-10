"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Modal from "./Modal";
import { closeRentModal } from "@/redux/features/rent/rentSlice";

const RentModal = () => {
  const { isRentModalOpen, loading } = useAppSelector((state) => state.rent);
  const dispatch = useAppDispatch();
  return (
    <Modal
      isOpen={isRentModalOpen}
      title="Rent your home"
      onClose={() => {
        dispatch(closeRentModal());
      }}
      onSubmit={() => {}}
      actionLabel="Next"
      disable={loading}
      body={<div>Rent Modal Content</div>}
      footer={<div>Rent Modal Footer</div>}
    />
  );
};

export default RentModal;
