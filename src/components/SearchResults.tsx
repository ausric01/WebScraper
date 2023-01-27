import { type FC } from "react";

const SearchResults: FC<{
  query: string;
  data: Set<{ title: string; href: string }>;
}> = ({ data, query }) => {
  return (
    <ul className="flex w-2/3 flex-col items-start gap-2 py-4">
      <h1 className="mb-4 select-none text-3xl font-medium tracking-wide text-white">
        Results for: {query}
      </h1>
      {[...data].map((anchor, i) => {
        return (
          <li
            key={i}
            className="w-full rounded-lg border-2 border-slate-800/50 bg-white/100 px-8 py-2 text-blue-600 hover:text-blue-800"
          >
            <a
              href={anchor.href}
              className="flex flex-col text-xl font-medium italic tracking-wide"
            >
              {anchor.title}{" "}
              <span className="text-sm font-normal tracking-normal text-slate-800 opacity-50">
                {anchor.href}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
