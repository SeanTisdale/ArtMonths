import { useState } from "react";
import closedFolder from "./assets/closedFolder.png";
import openFolder from "./assets/openFolder.png";

export default function Folder({
  id,
  openId,
  onOpenId,
  theme,
  month,
  year,
  start,
  end,
  onArtStart,
  onArtEnd,
}) {
  const [hover, setHover] = useState(null);
  const isOpen = openId === id;

  function handleClick() {
    onOpenId(isOpen ? null : id);
    onArtStart(() => start);
    onArtEnd(() => end);
  }

  return (
    <div className="folderContainer">
      <img
        className="folder"
        src={isOpen ? openFolder : hover === id ? openFolder : closedFolder}
        alt="folder"
        onClick={handleClick}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
      ></img>
      <h2>{theme}</h2>
      <p>
        {month}, {year}
      </p>
    </div>
  );
}
