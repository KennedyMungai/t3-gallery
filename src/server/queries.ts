import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

const user = auth();

export const getImages = async () => {
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
};
