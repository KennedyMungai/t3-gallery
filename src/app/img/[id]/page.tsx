import Image from "next/image";
import { getMyImage } from "~/server/queries";

type Props = {
  params: {
    id: string;
  };
};

const ImagePage = async ({ params: { id: photoId } }: Props) => {
    const photoIdNum = Number(photoId);

    if (Number.isNaN(photoIdNum)) throw new Error("Invalid photo Id");

    const image = await getMyImage(photoIdNum);

  return (
    <div className="flex h-full items-center justify-center">
      <Image src={image.url} alt={image.name} width={200} height={200} />
    </div>
  );
};

export default ImagePage;
