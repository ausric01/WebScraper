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
        className="w-96 rounded-l-full border-2 border-r-0 border-slate-200 py-1 px-4 text-slate-800 outline-none transition-colors placeholder:italic placeholder:tracking-wide placeholder:opacity-75"
      />
      <button className="rounded-r-full border-2 border-l-0 border-slate-200 bg-amber-400 py-1 pl-4 pr-5 font-medium text-white transition-colors hover:text-amber-600">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
  );
};

export default QueryForm;
