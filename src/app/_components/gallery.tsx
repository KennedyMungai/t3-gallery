"use client";

import Image from "next/image";
import Link from "next/link";
import { SimpleUploadButton } from "./simple_upload_button";

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
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="p-4">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                height={120}
                width={120}
                alt={image.id.toString()}
                className="rounded-sm"
              />
              <div>{image.name}</div>
            </Link>
          </div>
        ))}
      </div>
      <SimpleUploadButton />
    </div>
  );
};

export default Gallery;
