import { useState, useEffect } from "react";

const LinkPair = ({
  index,
  initialValue,
  onSave,
  onDelete,
  dragHandleProps,
}) => {
  const [mode, setMode] = useState(true);
  const [localLink, setLocalLink] = useState(initialValue);

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  useEffect(() => {
    setLocalLink(initialValue);
  }, [initialValue]);

  function check() {
    if (mode) {
      setMode(false);
      return;
    }

    const titleError = localLink.title === "";
    const urlError = localLink.url === "";

    setError1(titleError);
    setError2(urlError);

    if (!titleError && !urlError) {
      onSave(localLink);
      setMode(true);
    }
  }

  return (
    <div className="relative flex justify-between items-center w-full md:w-fit bg-base-200 rounded-2xl p-3">
      <h1 className="absolute top-3 right-4 md:relative md:top-0 md:right-0 text-2xl md:text-3xl md:ml-6 md:mr-2 bg-base-100 md:bg-base-200 rounded-full p-2 md:p-0">
        {index}
      </h1>

      <div className="divider divider-horizontal hidden md:flex"></div>

      <div className="flex flex-col md:flex-row md:gap-6">
        <fieldset className="fieldset relative mb-2">
          <legend className="fieldset-legend ml-1 text-sm md:text-base py-1 ">
            Link Title
          </legend>
          <input
            type="text"
            className={
              mode
                ? "input input-sm md:input-md pointer-events-none"
                : "input input-sm md:input-md"
            }
            placeholder="Type here"
            value={localLink.title}
            onChange={(e) =>
              setLocalLink({ ...localLink, title: e.target.value })
            }
          />
          {error1 && (
            <p className="label absolute -top-4 right-1 text-red-600 text-xs">
              *Link title is required.
            </p>
          )}
        </fieldset>

        <fieldset className="fieldset relative mb-2">
          <legend className="fieldset-legend ml-1 text-sm md:text-base py-1">
            Link URL
          </legend>
          <input
            type="text"
            className={
              mode
                ? "input input-sm md:input-md pointer-events-none"
                : "input input-sm md:input-md"
            }
            placeholder="Type here"
            value={localLink.url}
            onChange={(e) =>
              setLocalLink({ ...localLink, url: e.target.value })
            }
          />
          {error2 && (
            <p className="label absolute -top-4 right-1 text-red-600 text-xs">
              *Link URL is required.
            </p>
          )}
        </fieldset>

        <div className="flex gap-3 md:gap-6 my-auto">
          <button
            className={
              mode
                ? "btn btn-sm md:btn-md btn-primary"
                : "btn btn-sm md:btn-md btn-accent"
            }
            onClick={check}
          >
            {mode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 24 24"
              >
                <title xmlns="">edit</title>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                  <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 24 24"
              >
                <title xmlns="">save-24-regular</title>
                <path
                  fill="currentColor"
                  d="M3 5.75A2.75 2.75 0 0 1 5.75 3h9.965a3.25 3.25 0 0 1 2.298.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25zM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5z"
                />
              </svg>
            )}
          </button>

          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={() => onDelete(localLink)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6em"
              height="1.6em"
              viewBox="0 0 24 24"
            >
              <title xmlns="">delete-24-regular</title>
              <path
                fill="currentColor"
                d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467a2.25 2.25 0 0 0 2.24 2.033h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 6.5H5.576z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="divider divider-horizontal hidden md:flex"></div>

      <button
        {...dragHandleProps}
        className="touch-none cursor-grab active:cursor-grabbing p-3 md:p-0 my-auto md:ml-2 md:mr-6"
        title="Drag to reorder"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          viewBox="0 0 48 48"
        >
          <title xmlns="">drag</title>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M19 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8m22-32a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-4 18a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 14a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default LinkPair;
