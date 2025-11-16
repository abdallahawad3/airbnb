import { AXIOS_INSTANCE } from "@/config/axios.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addListing = async (listingData: any) => {
  try {
    const response = await AXIOS_INSTANCE.post("/listings", {
      title: listingData.title,
      description: listingData.description,
      imageSrc: listingData.imageSrc,
      category: listingData.category,
      roomCount: listingData.roomCount,
      bathroomCount: listingData.bathroomCount,
      guestCount: listingData.guestCount,
      location: { value: listingData.location.value },
      price: listingData.price,
    });
    if (response.status !== 200) {
      throw new Error("Failed to add listing");
    }
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
