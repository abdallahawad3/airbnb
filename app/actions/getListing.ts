import getCurrentUser from "./getCurrentUser";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SearchParams {
  userId?: string;
  category?: string;
  location?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  startDate?: string;
  endDate?: string;
}

export const dynamic = "force-dynamic";

export async function getListing(params: SearchParams) {
  const user = await getCurrentUser();
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      location,
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

    if (location) {
      query.location = location;
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
