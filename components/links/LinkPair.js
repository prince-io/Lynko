import { useState, useEffect } from "react";
import { Edit, SaveIcon, Delete, DragHandle } from "@/components/icons";

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
    <div className="relative flex justify-between items-center w-full bg-base-100 rounded-2xl p-2 md:p-4">
      <h1 className="absolute top-4 right-6 md:relative md:top-0 md:right-0 text-2xl md:text-4xl md:ml-6 md:mr-2 rounded-full p-2 md:p-0 w-8 flex justify-center items-center">
        {index}
      </h1>

      <div className="divider divider-primary divider-horizontal hidden md:flex"></div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 ml-2 md:mx-4 flex-1">
        <div className="flex flex-col md:flex-row md:gap-12">
          <fieldset className="fieldset relative md:mb-2">
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

          <fieldset className="fieldset relative md:mb-2">
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
        </div>

        <div className="flex gap-3 md:gap-6 my-2 md:my-auto">
          <button
            className={
              mode
                ? "btn btn-sm md:btn-md btn-secondary"
                : "btn btn-sm md:btn-md btn-accent"
            }
            onClick={check}
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
