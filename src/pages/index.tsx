import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import URLForm from "../components/QueryForm";
import { useRouter } from "next/router";
import { hash } from "../server/services/hasher";

const Home: NextPage = () => {
  const [query, setQuery] = useState<string | undefined>();
  const onSubmit = (query: string) => setQuery(query);
  const router = useRouter();

  useEffect(() => {
    !!query && router.push(`/${hash(query)}`);
  }, [query]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-800 to-red-800">
        <h1 className="select-none text-5xl font-extrabold tracking-tight text-slate-200">
          <span className="italic text-amber-400">Web</span> Scraper
        </h1>
        <URLForm submit={onSubmit} />
      </main>
    </>
  );
};

export default Home;
