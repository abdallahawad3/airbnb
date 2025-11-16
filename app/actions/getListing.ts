/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getListing() {
  try {
    const listing = prisma?.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
