import { Link } from "@remix-run/react";

const Header = () => {
    return (
        <header className="border-b flex items-center h-14 px-4 bg-green-300">
            <h1>
                <Link to="/">
                    <span className="text-2xl font-bold">Visit History Site</span>
                </Link>
            </h1>
        </header>
    );
};

export default Header;