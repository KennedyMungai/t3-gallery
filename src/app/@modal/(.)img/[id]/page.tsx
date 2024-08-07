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
      <Image src={image.url} width={200} height={200} alt={image.name} />
    </Modal>
  );
};

export default PhotoModal;
