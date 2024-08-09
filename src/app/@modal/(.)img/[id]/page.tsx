import Image from "next/image";
import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";
import { clerkClient } from "@clerk/nextjs/server";
import { Trash2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";

type Props = {
  params: {
    id: string;
  };
};

const PhotoModal = async ({ params: { id: photoId } }: Props) => {
  const photoIdNum = Number(photoId);

  if (Number.isNaN(photoIdNum)) throw new Error("Invalid photo Id");

  const image = await getMyImage(photoIdNum);

  const uploaderInfo = await clerkClient().users.getUser(image.userId);

  return (
    <Modal>
      <div className="flex gap-x-4">
        <div className="flex-1">
          <Image
            src={image.url}
            width={200}
            height={200}
            alt={image.name}
            className="rounded-lg object-contain"
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-2xl font-semibold uppercase text-white">
            {image.name.split(".")[0]}
          </p>
        </div>
        <div className="absolute bottom-2 right-2 flex items-center justify-center gap-x-4 text-white dark:text-white">
          <p>
            Uploaded By : {uploaderInfo?.fullName} on{" "}
            {new Date(image.createdAt).toLocaleDateString()}
          </p>
          <Button
            size="icon"
            variant={"outline"}
            className="text-red dark:text-red border-red-500 bg-transparent"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
