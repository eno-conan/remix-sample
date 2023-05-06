import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
// import { Link } from "@remix-run/react";
// import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

const samplePicturesArr = ['1', '2', '3', '4', '5', '6']

export default function Index() {
  return (
    <div>
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">最近の写真</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {samplePicturesArr.map((p) => (
              <div className="col-span-1" key={p}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img className="w-full" src="https://via.placeholder.com/640x360.png" alt={p} />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{p}</h3>
                    <p className="text-gray-500 mt-2">Card description</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
        <div>続きを見る</div>
      </div>
      <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
        <Link to="/add">
          <span className="text-2xl font-bold">記録を追加する</span>
        </Link>
      </div>

    </div>
  );
}

// ログイン関連の処理
// const user = useOptionalUser();
{/* {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                    >
                      Log In
                    </Link>
                  </div>
                )} */}
