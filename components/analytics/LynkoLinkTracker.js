"use client";

export default function LynkoLinkTracker({
  href,
  userId,
  linkId,
  title,
  className,
  children,
}) {
  const handleClick = (e) => {
    e.preventDefault();

    const metadata = {
      referrer: document.referrer || "",
      device:
        window.innerWidth < 768
          ? "mobile"
          : window.innerWidth < 1024
            ? "tablet"
            : "desktop",
    };

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "link_click",
        userId,
        linkId,
        metadata,
      }),
    }).catch(() => {});

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children || title}
    </a>
  );
}
