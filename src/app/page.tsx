import { getMyImages } from "~/server/queries";
import Gallery from "./_components/gallery";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const images = await getMyImages();

  return (
    <main>
      <Gallery images={images} />
    </main>
  );
};

export default HomePage;
