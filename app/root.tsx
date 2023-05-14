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
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import Layout from "./components/layout";
import ProgressBar from "./components/ProgressBar";

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
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
    // https://remix.run/docs/en/1.16.0/guides/envvars#browser-environment-variables
  });
};

export default function App() {
  const navigation = useNavigation();
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        {/* https://remix.run/docs/en/main/components/scroll-restoration */}
        <Scripts />
        {/* https://remix.run/docs/en/main/components/scripts */}
        <LiveReload />
        {navigation.state === 'loading' && <ProgressBar />}
        {/* https://remix.run/docs/en/main/components/live-reload */}
      </body>
    </html>
  );
}
