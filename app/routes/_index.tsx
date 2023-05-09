import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

// const samplePicturesArr = ['1', '2', '3', '4', '5', '6']

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
  // dataが1件もなければ、データ取得はsignedUrlの取得不要
  if (data!.length > 0) {
    data!.forEach((p: any) => {
      // .emptyFolderPlaceholderの場合は取得対象外
      if (p.name !== '.emptyFolderPlaceholder') {
        names.push(`image/${p.name}`);
      }
    })
  }
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
  // return json({
  //   signedUrls: []
  // });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const displayDetail = (url: string) => {
    // TODO:このままのURLの場合、参照リンクにした場合に表示できなくなるので、もう少し工夫が必要
    navigate("/detail", { state: { url: url } });
  }

  // ローディング表示管理
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <main className="relative min-h-0 bg-white sm:flex sm:items-center sm:justify-center">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-xl my-4">最近の写真</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.signedUrls!.length > 0 ? data.signedUrls!.map((p) => (
              <div className="col-span-1" key={p.signedUrl}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md h-64 hover:scale-105">
                  {/* 画像読み込みの間にローディング表示 */}
                  {isLoading && <div className="items-center text-xl px-8">Loading...</div>}
                  <img className="h-64 cursor-pointer" src={p.signedUrl} alt={p.signedUrl} width={250} height={250}
                    onLoad={handleLoad}
                    style={isLoading ? { display: 'none' } : {}}
                    onClick={() => displayDetail(p.signedUrl)} />
                </div>
              </div>
            ))
              :
              <>
                <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">画像が登録されていません</div>
              </>
            }
          </div>
        </div>
      </main>
      <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
        {/* 一覧画面表示：
        表示形式1：画像小さめでテキスト付きの表示形式
        表示形式2：トップ画面の延長の形で、画像のみの表示で30枚まで表示
        それ以上は別ページで表示
        */}
        <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
          <Link to="/list">
            <div>続きを見る</div>
          </Link>
        </div>
      </div>
      <div className="bg-white sm:flex sm:items-center sm:justify-center mt-4 text-xl">
        <Link to="/add">
          <span className="text-2xl font-bold">記録を追加</span>
        </Link>
      </div>
    </div >
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
