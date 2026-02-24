import React from "react";

interface HighlightMatchProps {
  text: string;
  query: string;
}

/**
 * Renders `text` with occurrences of `query` wrapped in a highlighted span.
 * Case-insensitive. Returns plain text when query is empty.
 */
export default function HighlightMatch({ text, query }: HighlightMatchProps) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-primary/20 text-primary font-medium rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
