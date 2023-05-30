import { Link } from "@remix-run/react";
import { useState } from "react";

const topicLinkWithStyle = (path: string, topic: string, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (
        <>
            <Link
                to={path}
                onClick={() => setIsOpen(false)}
                className="block px-2 py-2 text-green-500 font-semibold">
                {topic}
            </Link>
        </>)
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="border-b items-center h-14 bg-green-400 mb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold pl-6">
                    <Link to="/">
                        <span>Visit History</span>
                    </Link>
                </h1>
                <div className="flex justify-end p-1">
                    <div className="relative pr-1">
                        <button
                            type="button"
                            className="p-2 focus:bg-gray-200" //Tabキーでフォーカスしたときに、フォーカスしたことが分かるようにする。
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            <svg
                                role={"メニュー"}
                                aria-label={"メニュー"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8 text-gray-700"
                            >
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="absolute right-2 mt-2 w-48 bg-white border border-gray-300 rounded shadow-2xl">
                                <ul>
                                    {topicLinkWithStyle("/top", "直近の写真", setIsOpen)}
                                    {topicLinkWithStyle("/list", "過去の写真", setIsOpen)}
                                    {topicLinkWithStyle("/add", "記録を追加", setIsOpen)}
                                    {topicLinkWithStyle("/search", "候補地検索", setIsOpen)}
                                    {topicLinkWithStyle("/top", "設定変更", setIsOpen)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;