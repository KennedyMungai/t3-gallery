import Image from "next/image";
import { getMyImage } from "~/server/queries";

type Props = {
  params: {
    id: string;
  };
};

const PhotoModal = async ({ params: { id: photoId } }: Props) => {
  const photoIdNum = Number(photoId);

  if (Number.isNaN(photoIdNum)) throw new Error("Invalid photo Id");

  const image = await getMyImage(photoIdNum);

  return <Image src={image.url} width={120} height={120} alt={image.name} />;
};

export default PhotoModal;
