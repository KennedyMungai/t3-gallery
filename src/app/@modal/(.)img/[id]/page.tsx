import Image from "next/image";
import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";

type Props = {
  params: {
    id: string;
  };
};

const PhotoModal = async ({ params: { id: photoId } }: Props) => {
  const photoIdNum = Number(photoId);

  if (Number.isNaN(photoIdNum)) throw new Error("Invalid photo Id");

  const image = await getMyImage(photoIdNum);

  return (
    <Modal>
      <div className="flex gap-x-4">
        <div className="flex-1">
          <Image src={image.url} width={200} height={200} alt={image.name} />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-2xl font-semibold text-white">
            {image.name}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;
