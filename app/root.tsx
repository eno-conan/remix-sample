import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";

import { getUser } from "~/session.server";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import Layout from "./components/layout";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({
    user: await getUser(request),
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
    // https://sergiodxa.com/articles/use-process-env-client-side-with-remix
    // https://dev.to/remix-run-br/type-safe-environment-variables-on-both-client-and-server-with-remix-54l5
  });
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        /> */}
        {/* https://remix.run/docs/en/main/components/scroll-restoration */}
        <Scripts />
        {/* https://remix.run/docs/en/main/components/scripts */}
        <LiveReload />
        {/* https://remix.run/docs/en/main/components/live-reload */}
      </body>
    </html>
  );
}
