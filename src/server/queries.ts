import "server-only";
import { db } from "./db";
import { auth, getAuth } from "@clerk/nextjs/server";

export const getMyImages = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
};

export const getMyImage = async (id: number) => {
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  return image;
}; 