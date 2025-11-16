import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}
export const POST = async (
  request: Request,
  context: { params: Promise<IParams> }
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { listingId } = await context.params; // <-- أهم خطوة
  if (!listingId || typeof listingId !== "string") {
    return new Response("Invalid listing ID", { status: 400 });
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Here you would typically update the user in your database.
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });
  return NextResponse.json(user);
};

// Delete method to remove a listing from favorites
export const DELETE = async (
  request: Request,
  context: { params: Promise<IParams> }
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { listingId } = await context.params; // <-- أهم خطوة

  if (!listingId || typeof listingId !== "string") {
    return new Response("Invalid listing ID", { status: 400 });
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
};
