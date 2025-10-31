import { useRef, useState, useContext } from 'react'
import editIcon from '../../images/editIcon.svg'
import plusIcon from '../../images/plusIcon.svg'

import Card from '../Card/Card'
import ImagePopup from '../ImagePopup/ImagePopup'
import Popup from './Popup/Popup'
import NewCard from '../NewCard/NewCard'
import EditProfile from '../EditProfile/EditProfile'
import EditAvatar from '../EditAvatar/EditAvatar'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  onUpdateUser,
  onUpdateAvatar
}) {
  const imagePopupRef = useRef(null)
  const popupRef = useRef(null)

  const [imageData, setImageData] = useState({
    imageUrl: '',
    imageDescription: ''
  })

  const [popup, setPopup] = useState({ modal: 'newCard', title: 'Nuevo lugar' })

  const { currentUser } = useContext(CurrentUserContext)

  const handleOpenImagePopup = (imageUrl, imageDescription) => {
    setImageData({ imageUrl, imageDescription })
    imagePopupRef.current.showModal()
  }

  const handleSetPopup = (popupName) => {
    setPopup(popupName)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    popupRef.current.showModal()
  }

  const handleClosePopup = () => {
    popupRef.current.close()
  }

  const handleAddPlaceSubmit = async (data) => {
    await onAddPlaceSubmit(data)
    handleClosePopup()
  }

  const handleUpdateUser = async (data) => {
    await onUpdateUser(data)
    handleClosePopup()
  }

  const handleUpdateAvatar = async (data) => {
    await onUpdateAvatar(data)
    handleClosePopup()
  }

  return (
    <main className="content">
      <Popup
        title={popup.title}
        reference={popupRef}
        handleClosePopup={handleClosePopup}
      >
        {popup.modal === 'newCard' && (
          <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />
        )}
        {popup.modal === 'editAvatar' && (
          <EditAvatar onUpdateAvatar={handleUpdateAvatar} />
        )}
        {popup.modal === 'editProfile' && (
          <EditProfile onUpdateUser={handleUpdateUser} />
        )}
      </Popup>
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
