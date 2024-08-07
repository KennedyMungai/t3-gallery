import { db } from "~/server/db";
import Gallery from "./_components/gallery";

export const dynamic = "force-dynamic";

const HomePage = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main>
      <Gallery images={images} />
    </main>
  );
};

export default HomePage;
