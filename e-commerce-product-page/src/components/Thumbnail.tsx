import { IThumbnail } from "../assets/images/exportImages";
import "./Thumbnail.css";

interface Props {
  thumbnail: IThumbnail;
  handleThumbnailClick: (id: string) => void;
  activeId: string
}

const Thumbnail = ({thumbnail, handleThumbnailClick, activeId } : Props ) => {
  return (
    <button
    key={thumbnail.src}
    className="thumbnail"
    onClick={() => handleThumbnailClick(thumbnail.id)}
  >
    <span
      className={`thumbnail-img-wrapper ${
        thumbnail.id === activeId ? "active-img" : ""
      }`}
    >
      <img
        src={thumbnail.src}
        alt={thumbnail.alt}
        width={100}
        height={100}
        className="product-thumbnail"
        key={thumbnail.src}
      />
    </span>
  </button>
  );
};

export default Thumbnail;
