import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import toast from "react-hot-toast";
export const getFavorites = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: { in: [...(currentUser.favoriteIds || [])] },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
