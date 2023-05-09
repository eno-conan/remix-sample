import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

const samplePicturesArr = ['1', '2', '3', '4', '5', '6']

export const loader = async ({ request }: LoaderArgs) => {
  const supabaseClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  const { data, error } = await supabaseClient
    .storage
    .from('place-images')
    .list('image', {
      limit: 3,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  // 画像ファイル名を格納し、画面表示用のURLを取得
  const names: string[] = []
  data!.forEach((p: any) => {
    // .emptyFolderPlaceholderの場合は表示しない
    if (p.name !== '.emptyFolderPlaceholder') {
      names.push(`image/${p.name}`);
    }
  })
  if (names.length > 0) {
    const signedUrls = await supabaseClient
      .storage
      .from('place-images')
      .createSignedUrls(names, 60)
    return json({
      signedUrls: signedUrls.data
    });
  } else {
    return json({
      signedUrls: []
    });
  }
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const data = useLoaderData<typeof loader>();

  const handleClick = () => {
    setIsLoading(true);
  }

  return (
    <div>
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">最近の写真</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.signedUrls!.length > 0 && data.signedUrls!.map((p) => (
              <div className="col-span-1" key={p.signedUrl}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img className="w-full" src={p.signedUrl} alt={p.signedUrl} />
                  <div className="p-4">
                    <h3 className="font-medium text-lg">Text</h3>
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
        {isLoading && <div>Loading...</div>}
        <Link to="/add" onClick={handleClick}>
          <span className="text-2xl font-bold">記録を追加する</span>
        </Link>
      </div>
      <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
        {isLoading && <div>Loading...</div>}
        <Link to="/upload">
          <span className="text-2xl font-bold">画像をアップロードする</span>
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
