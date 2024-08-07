import Image from "next/image";
import { getMyImage } from "~/server/queries";

type Props = {
  params: {
    id: string;
  };
};

const ImagePage = async ({ params: { id: photoId } }: Props) => {
  const image = await getMyImage(Number(photoId));

  return (
    <div className="flex h-full items-center justify-center">
      <Image src={image.url} alt={image.name} width={200} height={200} />
    </div>
  );
};

export default ImagePage;
