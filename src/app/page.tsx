import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/d42e80fe-68c2-4d2f-9759-77d5524e92ba-1zbfv.png",
  "https://utfs.io/f/4db2019d-6733-44ef-8aa4-4a03c4c366a1-1juv3z.jpg",
  "https://utfs.io/f/2c242ff8-c8be-4cab-949a-ec1bf31249a0-sg2m69.png",
  "https://utfs.io/f/72581104-21ed-4983-ae0c-04a46495d9f2-laiag.png",
  "https://utfs.io/f/590eac91-944b-45e6-ae64-2f0a6992fd19-sfgo65.png",
  "https://utfs.io/f/4777faca-aad1-4b89-a5b2-b16f747f6cb3-sqxz0n.png",
  "https://utfs.io/f/a806d6d1-004c-4b12-bec6-fd456c94e2ea-xsbsk3.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

const HomePage = async () => {
  const posts = await db.query.images.findMany();

  console.log(posts);

  return (
    <main>
      <div className="gap-y-8 flex flex-col">
        <div>
          {posts.map((post) => (
            <div key={post.id}>{post.name}</div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {mockImages.map((image) => (
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
