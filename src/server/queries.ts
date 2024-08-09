import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";
import { db } from "./db";
import { images } from "./db/schema";

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

export const deleteMyImage = async (id: number) => {
  const image = await db.select().from(images).where(eq(images.id, id));

  if (!image) throw new Error("Image not found");

  await db.delete(images).where(eq(images.id, id));

  revalidatePath("/");
  redirect("/");
};