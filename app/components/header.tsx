import { Link } from "@remix-run/react";

const Header = () => {
    return (
        <header className="border-b items-center h-16 bg-green-200">
            <h1 className="text-4xl text-green-500 font-semibold py-2 px-8">
                <Link to="/">
                    <span className="">Visit History Site</span>
                </Link>
            </h1>
            <div className="flex justify-between w-full py-4 px-8 shadow-md bg-gray-200">
                <Link to="/top" className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    最近を振り返る
                </Link>
                . <Link to="/list" className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    これまでの写真を確認する
                </Link>
                . <Link to="/add" className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    新しく記録を追加する
                </Link>
                . <Link to="/search" className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    候補地を探す
                </Link>
                . <Link to="." className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    ？？？
                </Link>
                . <Link to="." className="inline-block px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                    設定を変更する
                </Link>
            </div>
        </header >
    );
};

export default Header;