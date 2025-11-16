/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAppDispatch } from "./redux";
import { onOpenLoginModal } from "@/redux/features/login/loginSlice";
import { AXIOS_INSTANCE } from "@/config/axios.config";
import toast from "react-hot-toast";

interface IFavorite {
  listingId: string;
  currentUser: any;
}

export const useFavorite = ({ listingId, currentUser }: IFavorite) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      dispatch(onOpenLoginModal());
      return;
    }
    try {
      let response;
      if (hasFavorite) {
        response = await AXIOS_INSTANCE.delete(`/favorites/${listingId}`);
      } else {
        response = await AXIOS_INSTANCE.post(`/favorites/${listingId}`);
      }
      if (response.status === 200) {
        router.refresh();
        toast.success("Success");
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };
  return {
    hasFavorite,
    toggleFavorite,
  };
};
