import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <nav className="py-4 border-b border-b-gray-200">
        <Container>
          <div className="flex  items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
