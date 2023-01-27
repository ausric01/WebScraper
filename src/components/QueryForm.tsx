import { useState, type FC, type FormEvent } from "react";

const QueryForm: FC<{
  submit: (e: string) => void;
}> = ({ submit }) => {
  const [query, alterQuery] = useState("");
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(query);
  };
  return (
    <form onSubmit={(e) => submitForm(e)} className="mt-8 flex flex-row">
      <input
        value={query}
        onChange={(e) => alterQuery(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-72 rounded-l-full border-2 border-r-0 border-slate-200/50 py-1 px-4 text-slate-800 outline-none transition-colors placeholder:italic placeholder:tracking-wide placeholder:opacity-75 md:w-96"
      />
      <button className="rounded-r-full border-2 border-l-0 border-slate-200/50 bg-amber-400 py-1  pl-2 pr-3 font-medium text-white transition-colors hover:text-amber-600 md:pl-4 md:pr-5">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
  );
};

export default QueryForm;
