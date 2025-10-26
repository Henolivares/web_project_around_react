import profileImage from '../../images/profile-image.jpg'
import { useRef, useState } from 'react'
import editIcon from '../../images/editIcon.svg'
import plusIcon from '../../images/plusIcon.svg'

import Card from '../Card/Card'
import ImagePopup from '../ImagePopup/ImagePopup'

const Cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z'
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z'
  }
]

export default function Main({ handleSetPopup }) {
  const imagePopupRef = useRef(null)
  const [cards, setCards] = useState(Cards)
  const [imageData, setImageData] = useState({
    imageUrl: '',
    imageDescription: ''
  })

  const handleOpenImagePopup = (imageUrl, imageDescription) => {
    setImageData({ imageUrl, imageDescription })
    imagePopupRef.current.showModal()
  }

  const handleLikeCard = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === cardId ? { ...card, isLiked: !card.isLiked } : card
      )
    )
  }
  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__image-container"
          id="edit-avatar-button"
          onClick={() => {
            handleSetPopup({
              modal: 'editAvatar',
              title: 'Editar imagen de perfil'
            })
          }}
        >
          <img
            src={profileImage}
            alt="Imagen de perfil"
            className="profile__image"
          />
          <span className="profile__image-span">
            <img
              src={editIcon}
              className="profile__image-edit"
              alt="icono de editar"
            />
          </span>
        </button>
        <div className="profile__inner">
          <h1 className="profile__name" id="profile-name"></h1>
          <button
            className="button profile__edit-button"
            id="edit-button"
            onClick={() => {
              handleSetPopup({ modal: 'editProfile', title: 'Editar perfil' })
            }}
          >
            <img src={editIcon} alt="icono de editar" />
          </button>
        </div>
        <p className="profile__description" id="profile-description"></p>
        <button
          className="button profile__add-button"
          id="add-button"
          onClick={() => {
            handleSetPopup({ modal: 'newCard', title: 'Nuevo lugar' })
          }}
        >
          <img src={plusIcon} alt="icono de agregar mas" />
        </button>
      </section>
      <section className="gallery" id="gallery">
        <ImagePopup
          reference={imagePopupRef}
          imageUrl={imageData.imageUrl}
          imageDescription={imageData.imageDescription}
        />
        {cards.map((card) => (
          <Card
            key={card._id}
            {...card}
            handleOpenImagePopup={handleOpenImagePopup}
            handleLikeCard={handleLikeCard}
          />
        ))}
      </section>
    </main>
  )
}
