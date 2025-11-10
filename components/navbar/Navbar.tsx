import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import type { safeUser } from "@/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: safeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm border-b-gray-200">
      <nav className="py-1 ">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </nav>
      <Categories />
    </header>
  );
};

export default Navbar;
