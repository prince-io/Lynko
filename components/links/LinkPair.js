import { useState, useEffect } from "react";
import { Edit, SaveIcon, Delete, DragHandle } from "@/components/icons";

const TITLE_MAX = 100;
const URL_MAX = 2048;

const LinkPair = ({
  index,
  initialValue,
  onSave,
  onDelete,
  dragHandleProps,
}) => {
  const [mode, setMode] = useState(true);
  const [localLink, setLocalLink] = useState(initialValue);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  useEffect(() => {
    setLocalLink(initialValue);
  }, [initialValue]);

  function check() {
    if (mode) {
      setMode(false);
      return;
    }

    const title = localLink.title.trim();
    const url = localLink.url.trim();

    let err1 = "";
    let err2 = "";

    if (!title) err1 = "Link title is required.";
    else if (title.length > TITLE_MAX) err1 = `Max ${TITLE_MAX} characters.`;

    if (!url) err2 = "Link URL is required.";
    else if (url.length > URL_MAX) err2 = `Max ${URL_MAX} characters.`;

    setError1(err1);
    setError2(err2);

    if (!err1 && !err2) {
      onSave(localLink);
      setMode(true);
    }
  }

  return (
    <div className="relative flex justify-between items-start md:items-center w-full bg-base-100 rounded-2xl p-2 md:p-4">
      <h1 className="hidden md:flex text-2xl md:text-4xl md:ml-6 md:mr-2 rounded-full p-2 md:p-0 w-8 justify-center items-center">
        {index}
      </h1>

      <div className="divider divider-primary divider-horizontal hidden md:flex"></div>

      <span className="flex md:hidden absolute bottom-3 right-4 text-2xl rounded-full w-10 h-10 justify-center items-center bg-base-300">
        {index}
      </span>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 ml-2 md:mx-4 flex-1">
        <div className="flex flex-col md:flex-row md:gap-12">
          <fieldset className="fieldset md:mb-2">
            <legend className="fieldset-legend ml-1 text-sm md:text-2xl md:py-3">
              Link Title
            </legend>
            <input
              type="text"
              className={
                mode
                  ? "input input-sm md:input-md pointer-events-none md:text-base"
                  : "input input-sm md:input-md md:text-base"
              }
              placeholder="Type here"
              maxLength={TITLE_MAX}
              value={localLink.title}
              onChange={(e) =>
                setLocalLink({ ...localLink, title: e.target.value })
              }
            />
            <div className="flex justify-between items-center min-h-5 px-2">
              {error1 ? (
                <p className="text-red-600 text-xs">{error1}</p>
              ) : (
                <span />
              )}
              {!mode && (
                <p className="text-xs text-base-content/40">
                  {localLink.title.length}/{TITLE_MAX}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="fieldset md:mb-2">
            <legend className="fieldset-legend ml-1 text-sm md:text-2xl md:py-3">
              Link URL
            </legend>
            <input
              type="text"
              className={
                mode
                  ? "input input-sm md:input-md pointer-events-none md:text-base"
                  : "input input-sm md:input-md md:text-base"
              }
              placeholder="Type here"
              maxLength={URL_MAX}
              value={localLink.url}
              onChange={(e) =>
                setLocalLink({ ...localLink, url: e.target.value })
              }
            />
            <div className="flex justify-between items-center min-h-5 px-2">
              {error2 ? (
                <p className="text-red-600 text-xs">{error2}</p>
              ) : (
                <span />
              )}
              {!mode && (
                <p className="text-xs text-base-content/40">
                  {localLink.url.length}/{URL_MAX}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <div className="flex gap-3 md:gap-6 my-2 md:my-auto">
          <button
            className={
              mode
                ? "btn btn-sm md:btn-md btn-secondary"
                : "btn btn-sm md:btn-md btn-accent"
            }
            onClick={check}
            title={mode ? "Edit" : "Save"}
          >
            {mode ? (
              <Edit w="1.6em" h="1.6em" className="stroke-current" />
            ) : (
              <SaveIcon w="1.6em" h="1.6em" />
            )}
          </button>

          <button
            className="btn btn-sm md:btn-md btn-secondary"
            onClick={() => onDelete(localLink)}
            title="Delete"
          >
            <Delete w="1.6em" h="1.6em" className="fill-current" />
          </button>
        </div>
      </div>

      <div className="divider divider-primary divider-horizontal hidden md:flex"></div>

      <button
        {...dragHandleProps}
        className="touch-none cursor-grab active:cursor-grabbing p-3 md:p-0 my-auto md:ml-2 md:mr-6"
        title="Drag to reorder"
      >
        <DragHandle w="1.6em" h="1.6em" className="fill-current" />
      </button>
    </div>
  );
};

export default LinkPair;
