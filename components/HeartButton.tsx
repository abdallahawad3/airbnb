import { useFavorite } from "@/hooks/useFavorite";
import type { safeUser } from "@/types";
import type { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId?: string;
  currentUser?: safeUser | null;
}
const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId: listingId!,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="absolute fill-white -top-0.5 -right-0.5"
      />

      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
