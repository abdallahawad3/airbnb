import { auth } from "@/libs/auth";
import prisma from "@/libs/prismadb";

export default async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}
