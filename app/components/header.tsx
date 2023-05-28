import { Link } from "@remix-run/react";

const topicLinkWithStyle = (path: string, topic: string) => {
    return (
        <>
            <Link to={path} className="px-4 py-2 text-green-500 text-lg font-semibold hover:underline">
                {topic}
            </Link>
        </>)
}

const Header = () => {
    return (
        <header className="border-b items-center h-14 bg-green-400">
            <h1 className="text-2xl font-semibold px-4">
                <Link to="/">
                    <span className="">Visit History Site</span>
                </Link>
            </h1>
            {/* <div className="flex justify-between w-full mt-6 px-6 shadow-md"> */}
            <div className="flex flex-wrap justify-center mt-6 px-8 shadow-md sm:justify-center">
                {topicLinkWithStyle("/top", "直近の写真")}
                {topicLinkWithStyle("/list", "過去の写真を確認")}
                {topicLinkWithStyle("/add", "記録を追加")}
                {topicLinkWithStyle("/search", "候補地検索")}
                {topicLinkWithStyle("/top", "設定変更")}
            </div>
        </header >
    );
};

export default Header;