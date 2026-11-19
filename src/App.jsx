import { useEffect, useState } from "react";
import { art } from "./art.jsx";
import Folder from "./folder.jsx";
import { folderList } from "./folderList.jsx";
import artMonth from "./assets/artMonth.gif";
import ArtPiece from "./ArtPiece.jsx";

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [artStart, setArtStart] = useState(null);
  const [artEnd, setArtEnd] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key !== "Escape") return;

      if (expandedId !== null) {
        setExpandedId(null);
      } else if (openId !== null) {
        setOpenId(null);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId, openId]);

  return (
    <>
      <Header />
      <div className="folderLayout">
        {folderList.map((folder) => (
          <Folder
            key={folder.theme}
            id={folder.id}
            openId={openId}
            onOpenId={setOpenId}
            month={folder.month}
            theme={folder.theme}
            year={folder.year}
            start={folder.artStart}
            end={folder.artEnd}
            onArtStart={setArtStart}
            onArtEnd={setArtEnd}
            expandedId={expandedId}
          />
        ))}
        {openId !== null && (
          <MonthDisplay
            art={art}
            artStart={artStart}
            artEnd={artEnd}
            onClose={() => setOpenId(null)}
            expandedId={expandedId}
            onSetExpandedId={setExpandedId}
          />
        )}
      </div>
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <img src={artMonth} />
      <p>A project by Sean Tisdale</p>
    </div>
  );
}

function MonthDisplay({
  onClose,
  artStart,
  artEnd,
  art,
  expandedId,
  onSetExpandedId,
}) {
  const [sortBy, setSortBy] = useState("upload");

  let sortedArt;

  if (sortBy === "upload") sortedArt = art;
  if (sortBy === "creator")
    sortedArt = art.slice().sort((a, b) => a.creator.localeCompare(b.creator));
  if (sortBy === "theme")
    sortedArt = art.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="overlayContainer" onClick={(e) => e.stopPropagation()}>
        <select
          className="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="upload">Sort by order uploaded</option>
          <option value="creator">Sort by Creator</option>
          <option value="theme">Sort by Theme</option>
        </select>
        <ul className="artShowcase">
          {sortedArt
            .filter((piece) => piece.id >= artStart && piece.id <= artEnd)
            .map((piece) => (
              <ArtPiece
                link={piece.link}
                type={piece.type}
                key={piece.id}
                id={piece.id}
                name={piece.name}
                creator={piece.creator}
                expandedId={expandedId}
                onSetExpandedId={onSetExpandedId}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
