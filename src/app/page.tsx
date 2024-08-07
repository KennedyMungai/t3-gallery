import { currentUser } from "@clerk/nextjs/server";
import { getImages } from "~/server/queries";
import Gallery from "./_components/gallery";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const user = await currentUser();

  const images = await getImages();

  return (
    <main>
      <Gallery images={images} />
    </main>
  );
};

export default HomePage;
