import { useRef, useState, useContext } from 'react'
import editIcon from '../../images/editIcon.svg'
import plusIcon from '../../images/plusIcon.svg'

import Card from '../Card/Card'
import ImagePopup from '../ImagePopup/ImagePopup'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Main({
  handleSetPopup,
  cards,
  onCardLike,
  onCardDelete
}) {
  const imagePopupRef = useRef(null)

  const [imageData, setImageData] = useState({
    imageUrl: '',
    imageDescription: ''
  })

  const { currentUser } = useContext(CurrentUserContext)

  const handleOpenImagePopup = (imageUrl, imageDescription) => {
    setImageData({ imageUrl, imageDescription })
    imagePopupRef.current.showModal()
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
            src={currentUser.avatar}
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
          <h1 className="profile__name" id="profile-name">
            {currentUser.name}
          </h1>
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
        <p className="profile__description" id="profile-description">
          {currentUser.about}
        </p>
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
            handleCardLike={onCardLike}
            handleCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}
