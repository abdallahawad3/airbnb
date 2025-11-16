/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IListing {
  userId?: string;
}
export async function getListing({ userId }: IListing) {
  try {
    const query: any = {};
    if (userId) {
      query.userId = userId;
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
