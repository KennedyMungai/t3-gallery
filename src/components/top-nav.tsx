import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

type Props = {};

const TopNav = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 text-2xl font-semibold border-b shadow-sm">
      <div>Gallery</div>
      <div className="flex items-center justify-center gap-4">
        <Button variant={"outline"}>Sign In</Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
