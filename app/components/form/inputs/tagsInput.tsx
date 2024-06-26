import { useState } from "react";

type tagsInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function TagsInput(props: tagsInputProps) {
  const { tags, setTags } = props;

  const [tagInput, setTagInput] = useState("");

  const addTag = (tag: string) => {
    if (tag === "") {
      return;
    }
    setTags([...tags, tag]);
    setTagInput("");
  };

  return (
    <div className="max-w-7xl sm:col-span-6">
      <label
        htmlFor="location"
        className="block text-md font-medium text-gray-700"
      >
        Tags
      </label>
      <input
        type="text"
        name="input_tag"
        className="mt-1 w-48 rounded-md border border-gray-300 p-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        onChange={(e) => {
          setTagInput(e.target.value);
        }}
        value={tagInput}
      />
      <button
        type="button"
        className="mx-2 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        onClick={() => {
          addTag(tagInput);
        }}
      >
        Add
      </button>

      <div>
        <ul className="m-2 flex flex-wrap">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="text-md relative mr-4 mt-4 flex-initial rounded-lg bg-teal-500 p-3 text-center font-medium text-white shadow-sm"
            >
              <button>
                <input type="hidden" name={`tag_${index}`} value={tag} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-teal-900"
                  onClick={() => {
                    setTags(
                      tags.filter((c) => {
                        return c !== tag;
                      }),
                    );
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
