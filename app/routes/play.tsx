import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { AiFillGithub } from "react-icons/ai";
import GoodButton from "~/components/GoodButton";
import TestComp from "~/components/test";
// import { useState } from "react";

export const loader = async ({ params, request }: LoaderArgs) => {
	return json({ any: "thing" });
};

export default function PlayPage() {
	const data = useLoaderData<typeof loader>();
	return (
		<div className="flex h-full min-h-screen flex-col">
			<header className="flex items-center justify-between bg-slate-800 p-4 text-white">
				<h1 className="text-3xl font-bold">
					<Link to=".">Notes</Link>
				</h1>
				<div className="ml-6">
					{/* use react-icons */}
					<Link to="https://github.com/eno-conan">
						<AiFillGithub size={"2rem"} />
					</Link>
					{/* <TestComp /> */}
				</div>
				<Form action="/logout" method="post">
					<button
						type="submit"
						className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
					>
						Logout
					</button>
				</Form>
			</header>
			<main className="flex h-full bg-white">
				<div className="ml-6">{data.any}</div>
				<div className="ml-6"><GoodButton initState={false} /></div>
				{/* <div className="flex-1 p-6">
					<Outlet />
				</div> */}
			</main>
		</div>
	);
}
