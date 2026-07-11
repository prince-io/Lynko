"use client";

import { useState, useEffect } from "react";
import LinkPair from "./LinkPair";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { generateUUID } from "@/lib/uuid";

const restrictToVerticalAxis = ({ transform }) => ({
  ...transform,
  x: 0,
});

const restrictToWindowEdges = ({ transform, draggingNodeRect, windowRect }) => {
  if (!draggingNodeRect || !windowRect) return transform;

  const newY = Math.min(
    Math.max(transform.y, -draggingNodeRect.top),
    windowRect.height - draggingNodeRect.bottom,
  );

  return {
    ...transform,
    y: newY,
  };
};

const SortableLink = ({ link, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.clientId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ attributes, listeners })}
    </div>
  );
};

const LinksTab = ({ user, setUser }) => {
  const [initialLinks, setInitialLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [display, setDisplay] = useState(false);
  const [mssg, setMssg] = useState({});
  const [toast, setToast] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/links");
      const data = await res.json();

      const linksArray = data.map((link) => ({
        ...link,
        clientId: generateUUID(),
      }));

      setInitialLinks(linksArray);
      setLinks(linksArray);
    })();
  }, []);

  useEffect(() => {
    if (!toast) return;

    (() => {
      setDisplay(true);

      const timer = setTimeout(() => {
        setDisplay(false);
        setToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    })();
  }, [toast]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    setLinks((prev) => {
      const oldIndex = prev.findIndex((link) => link.clientId === active.id);
      const newIndex = prev.findIndex((link) => link.clientId === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);

      return reordered.map((link, index) => ({
        ...link,
        order: index + 1,
      }));
    });
  };

  const addLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        clientId: generateUUID(),
        title: "",
        url: "",
        order: prev.length + 1,
        isActive: true,
      },
    ]);
    setMssg({
      text: "Link added",
      type: "alert-info",
    });
    setToast(true);
  };

  const removeLink = (clientId) => {
    setLinks((prev) =>
      prev.filter((link) => {
        if (link.clientId === clientId && link._id) {
          setDeletedIds((ids) => [...ids, link._id]);
        }
        return link.clientId !== clientId;
      }),
    );
    setMssg({
      text: "Link deleted",
      type: "alert-info",
    });
    setToast(true);
  };

  const saveLink = (clientId, updatedLink) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.clientId === clientId ? { ...link, ...updatedLink } : link,
      ),
    );
    setMssg({
      text: "Link saved",
      type: "alert-info",
    });
    setToast(true);
  };

  const saveAllLinks = async () => {
    if (isSaving) return;
    setIsSaving(true);

    for (const link of links) {
      if (link._id) {
        await fetch(`/api/links/${link._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: link.title,
            url: link.url,
            order: link.order,
            isActive: link.isActive,
          }),
        });
      } else {
        await fetch("/api/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: link.title,
            url: link.url,
            order: link.order,
            isActive: link.isActive,
          }),
        });
      }
    }

    for (const id of deletedIds) {
      await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });
    }

    setDeletedIds([]);

    (async () => {
      const res = await fetch("/api/links");
      const data = await res.json();

      const linksArray = data.map((link) => ({
        ...link,
        clientId: generateUUID(),
      }));

      setInitialLinks(linksArray);
      setLinks(linksArray);

      if (res.ok) {
        setIsSaving(false);
        setMssg({ text: "Links updated successfully.", type: "alert-success" });
        setToast(true);
      }
    })();
  };

  function resetLinks() {
    setLinks(initialLinks);
    setDeletedIds([]);
    setMssg({
      text: "Links reset to saved state.",
      type: "alert-info",
    });
    setToast(true);
  }

  const hasEmptyLinks = links.some(
    (link) => !link.title?.trim() || !link.url?.trim(),
  );

  const isDirty =
    deletedIds.length > 0 ||
    JSON.stringify(links.map((l) => ({ ...l }))) !==
      JSON.stringify(initialLinks.map((l) => ({ ...l })));

  return (
    <div>
      {display && (
        <div className="toast toast-end z-3">
          <div className={`alert text-lg ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:p-0">
          <h1 className="text-xl md:text-3xl">Link It All</h1>

          <div className="divider divider-primary md:hidden"></div>

          <div className="flex gap-3 md:gap-4">
            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={addLink}
            >
              Add link
            </button>

            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={resetLinks}
            >
              Reset
            </button>

            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={saveAllLinks}
              disabled={!isDirty || isSaving || hasEmptyLinks}
            >
              {isSaving ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>

        <div className="divider divider-primary hidden md:flex"></div>

        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
              <SortableContext
                items={links.map((link) => link.clientId)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col items-stretch gap-4 md:gap-6 my-4 md:my-6">
                  {links.map((link, index) => (
                    <SortableLink key={link.clientId} link={link}>
                      {({ attributes, listeners }) => (
                        <LinkPair
                          index={index + 1}
                          initialValue={link}
                          onSave={(value) => saveLink(link.clientId, value)}
                          onDelete={() => removeLink(link.clientId)}
                          dragHandleProps={{ ...attributes, ...listeners }}
                        />
                      )}
                    </SortableLink>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksTab;
