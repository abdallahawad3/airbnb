/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Modal from "./Modal";
import { closeRentModal } from "@/redux/features/rent/rentSlice";
import { Fragment, useMemo, useState } from "react";
import Heading from "../ui/Heading";
import { CATEGORIES } from "../navbar/Categories";
import CategoryInput from "../ui/inputs/CategoryInput";
import { useForm, type FieldValues } from "react-hook-form";
import CountrySelect from "../ui/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../ui/inputs/Counter";
import ImageUpload from "../ui/inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const { isRentModalOpen, loading } = useAppSelector((state) => state.rent);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );
  const center = useMemo<[number, number] | undefined>(() => {
    if (location?.latlng.length === 2) {
      return [location.latlng[0], location.latlng[1]];
    }
    return undefined;
  }, [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto overflow-x-hidden">
        {CATEGORIES.map((item) => (
          <Fragment key={item.label}>
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );

  //! -------------------------- //
  // ** Location Step Content ** //
  //! --------------------------- //
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={center} />
      </div>
    );
  }

  // !----------------------- //
  // ** Info Step Content ** //
  // !----------------------- //
  if (step === STEPS.INFO) {
    bodyContent = (
      <div>
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        <br />
        <div className="space-y-2">
          <Counter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr className="text-neutral-300 py-2" />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />

          <hr className="text-neutral-300 py-2" />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div>
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <br />
        <ImageUpload
          onChange={(value) => {
            setCustomValue("imageSrc", value);
          }}
          value={imageSrc}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={isRentModalOpen}
      title="Rent your home"
      onClose={() => {
        dispatch(closeRentModal());
      }}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      disable={loading}
      body={bodyContent}
    />
  );
};

export default RentModal;
