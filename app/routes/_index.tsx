import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

// const samplePicturesArr = ['1', '2', '3', '4', '5', '6']


export default function Index() {

  return (
    <div>
      <main className="relative min-h-0 bg-white sm:flex sm:items-center sm:justify-center">
        {/* TODO:ここにサイトの紹介？みたいな画像を1枚入れて文章を表示して・・・ */}
        <div className="sm:items-center sm:justify-center mt-4 text-xl">
          {/* 一覧画面表示：
        表示形式1：画像小さめでテキスト付きの表示形式
        表示形式2：トップ画面の延長の形で、画像のみの表示で30枚まで表示
        それ以上は別ページで表示
        */}
          <div>
            <Link to="/top">
              <div className="text-2xl font-bold">一覧表示</div>
            </Link>
          </div>
          <Link to="/add">
            <span className="text-2xl font-bold">記録を追加</span>
          </Link>
        </div>
        {/* <div>Hello HistorySite</div> */}
      </main>
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
