import { useState } from "react";

export default function ArtPiece({
  link,
  type,
  name,
  creator,
  id,
  expandedId,
  onSetExpandedId,
}) {
  const [description, setDescription] = useState(null);
  const [flipLeft, setFlipLeft] = useState(false);

  const expanded = expandedId === id;

  const checkPosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const bubbleWidth = 200;
    const spacing = 12;

    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    setFlipLeft(
      spaceRight < bubbleWidth + spacing && spaceLeft >= bubbleWidth + spacing,
    );
  };

  return (
    <div
      className="art-container"
      onMouseEnter={(e) => {
        setDescription(id);
        checkPosition(e);
      }}
      onMouseLeave={() => setDescription(null)}
      onClick={() => onSetExpandedId(id)}
    >
      <li>
        {type === "Video" ? (
          <div className="video-thumb">
            <video className="thumb-video" muted playsInline preload="metadata">
              <source src={`${link}#t=0.1`} type="video/mp4" />
            </video>
            <span className="play-badge" aria-hidden="true" />
          </div>
        ) : type === "Painting" ? (
          <img src={link} alt={name} />
        ) : null}
      </li>

      <div
        className={`description ${
          description === id ? "visible" : ""
        } ${flipLeft ? "flip-left" : ""}`}
      >
        <div className="column">
          <h2>{name}</h2>
          <p>{creator}</p>
        </div>
      </div>

      {expanded && (
        <div
          className="lightbox"
          onClick={(e) => {
            e.stopPropagation();
            onSetExpandedId(null);
          }}
        >
          {type === "Video" ? (
            <video
              src={link}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img src={link} alt={name} />
          )}
        </div>
      )}
    </div>
  );
}
