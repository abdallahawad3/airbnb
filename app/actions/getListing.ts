import getCurrentUser from "./getCurrentUser";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IListing {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export async function getListing(params: IListing) {
  const user = await getCurrentUser();
  console.log(user);
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
    } = params;

    const query: any = {};

    if (!userId) {
      query.userId = user?.id;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }

    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }

    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: endDate },
                endDate: { gte: startDate },
              },
              {
                startDate: { gte: startDate },
                endDate: { lte: endDate },
              },
            ],
          },
        },
      };
    }

    const listing = await prisma?.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });
    const safeListing = listing?.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
