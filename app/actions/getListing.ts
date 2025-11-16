/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getListing() {
  try {
    const listing = await prisma?.listing.findMany({
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
