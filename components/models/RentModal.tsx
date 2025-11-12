/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Modal from "./Modal";
import { closeRentModal } from "@/redux/features/rent/rentSlice";
import { Fragment, useMemo, useState } from "react";
import Heading from "../ui/Heading";
import { CATEGORIES } from "../navbar/Categories";
import CategoryInput from "../ui/inputs/CategoryInput";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import CountrySelect from "../ui/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../ui/inputs/Counter";
import ImageUpload from "../ui/inputs/ImageUpload";
import Input from "../ui/inputs/Input";
import toast from "react-hot-toast";
import type { RootState } from "@/redux/store";
import { addListing } from "@/redux/features/listings/listingSlice";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const { isRentModalOpen } = useAppSelector((state) => state.rent);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { loading: listingLoading } = useAppSelector(
    (state: RootState) => state.listing
  );
  const [step, setStep] = useState(STEPS.CATEGORY);
  const { register, handleSubmit, setValue, watch, control, reset } =
    useForm<FieldValues>({
      defaultValues: {
        title: "",
        description: "",
        category: "",
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: "",
        price: 1,
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
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div>
        <Heading
          title="How would you describe your place?"
          subTitle="Short and sweet works best!"
        />
        <br />
        <Input
          name="title"
          field={register("title")}
          type="text"
          required={true}
          label="Title"
        />
        {/* <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
           
          )} */}
        {/* /> */}
        <br />
        <Controller
          name="description"
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="description"
              field={register("description")}
              type="textarea"
              error={error}
              required={true}
              label="Description"
            />
          )}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div>
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <br />
        <Controller
          name="price"
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="price"
              field={register("price")}
              type="number"
              error={error}
              required={true}
              label="Price per night (USD)"
            />
          )}
        />
      </div>
    );
  }

  const onSubmit = handleSubmit((data) => {
    setIsError(false);
    if (step === STEPS.CATEGORY) {
      if (!data.category) {
        toast.error("Please select a category");
        setIsError(true);
        return;
      }
    }

    if (step === STEPS.LOCATION) {
      if (!data.location) {
        setIsError(true);
        toast.error("Please select a location");
        return;
      }
    }

    if (step === STEPS.INFO) {
      if (!data.guestCount || !data.roomCount || !data.bathroomCount) {
        toast.error("Please provide guest, room, and bathroom counts");
        setIsError(true);
        return;
      }
    }

    if (step === STEPS.IMAGES) {
      if (!data.imageSrc) {
        setIsError(true);
        toast.error("Please upload an image of your place");
        return;
      }
    }

    if (step === STEPS.DESCRIPTION) {
      if (!data.title || !data.description) {
        setIsError(true);
        toast.error("Please provide a title and description for your place");
        return;
      }
    }

    // If this is NOT the final step (PRICE), go to next
    if (step !== STEPS.PRICE) {
      onNext();
      return;
    }
    if (!isError) {
      dispatch(
        addListing({
          bathroomCount: data.bathroomCount,
          category: data.category,
          description: data.description,
          guestCount: data.guestCount,
          imageSrc: data.imageSrc,
          location: data.location.value,
          price: data.price,
          roomCount: data.roomCount,
          title: data.title,
        })
      )
        .unwrap()
        .then(() => {
          setTimeout(() => {
            dispatch(closeRentModal());
            reset();
          }, 2000);
        })
        .catch(() => {
          toast.error("Failed to create listing. Please try again.");
        });
    }
  });

  return (
    <Modal
      isOpen={isRentModalOpen}
      title="Rent your home"
      onClose={() => {
        dispatch(closeRentModal());
      }}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      disable={listingLoading}
      body={bodyContent}
    />
  );
};

export default RentModal;
