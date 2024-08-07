import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const images = await db.query.images.findMany();

  return (
    <main>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-wrap gap-4">
          {images.map((image) => (
            <div key={image.id} className="p-4">
              <Image
                src={image.url}
                height={100}
                width={100}
                alt={image.id.toString()}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
