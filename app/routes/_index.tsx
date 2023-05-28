import { json, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
// import { useLoaderData, useNavigate } from "@remix-run/react";
// import { createClient } from "@supabase/supabase-js";
// import { useState } from "react";
// import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

// const samplePicturesArr = ['1', '2', '3', '4', '5', '6']


export default function Index() {

  return (
    <>
      <main className="bg-gray-100 mt-20">
        <div className="px-4 mt-12">
          {/* <img src="/index.jpg" alt="Sample Image" className="w-full h-1/2 rounded my-2" /> */}
          {/* <div className="absolute top-0 left-0 text-xl w-full h-full flex justify-center items-center text-white">
            <p className="text-center max-w-md px-4">{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod faucibus dui vitae tempus. Donec nec urna at enim facilisis dignissim. Sed non arcu rhoncus, bibendum sem a, sagittis velit. Nunc aliquam auctor orci, sed gravida felis rhoncus vel. Praesent gravida nunc id tellus cursus vestibulum."}</p>
          </div> */}
        </div>
      </main>
    </>
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
