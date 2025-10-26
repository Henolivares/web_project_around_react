import trashIcon from '../../images/trashIcon.svg'
import likeIcon from '../../images/likeIcon.svg'
import likedIcon from '../../images/likedIcon.svg'

export default function Card({
  name,
  link,
  isLiked,
  _id,
  handleOpenImagePopup,
  handleLikeCard
}) {
  const handleImageClick = () => {
    handleOpenImagePopup(link, name)
  }

  const handleLikeClick = () => {
    handleLikeCard(_id)
  }

  return (
    <article className="gallery__card">
      <button className="gallery__button gallery__button_delete">
        <img src={trashIcon} alt="delete icon" className="gallery__icon" />
      </button>
      <img
        src={link}
        alt={name}
        className="gallery__image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <div className="gallery__inner">
        <h2 className="gallery__title">{name}</h2>
        <button
          className="gallery__button gallery__button_like"
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? likedIcon : likeIcon}
            alt="icono de corazón"
            className="gallery__icon gallery__icon-like"
          />
        </button>
      </div>
    </article>
  )
}
