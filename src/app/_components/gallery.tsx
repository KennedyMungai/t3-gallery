"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

type Props = {
  images: {
    name: string;
    url: string;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
};

const Gallery = ({ images }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="p-4">
            <Image
              src={image.url}
              height={120}
              width={120}
              alt={image.id.toString()}
              className="rounded-sm"
            />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
      <UploadButton
        endpoint={"imageUploader"}
        onClientUploadComplete={() => router.refresh()}
      />
    </div>
  );
};

export default Gallery;
