import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

import NewCard from '../components/NewCard/NewCard'
import EditProfile from '../components/EditProfile/EditProfile'
import EditAvatar from '../components/EditAvatar/EditAvatar'
import Popup from './Main/Popup/Popup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api'
import { useRef, useState, useEffect } from 'react'

function App() {
  const [cards, setCards] = useState([])
  const [popup, setPopup] = useState({ modal: 'newCard', title: 'Nuevo lugar' })
  const popupRef = useRef(null)

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards)
    })
  }, [])

  async function handleAddPlaceSubmit(data) {
    await api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state])
        handleClosePopup()
      })
      .catch((error) => console.error(error))
  }

  async function handleCardLike(isLiked, cardId) {
    await api
      .likeCard(isLiked, cardId)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === cardId ? newCard : currentCard
          )
        )
      })
      .catch((error) => console.error(error))
  }

  async function handleCardDelete(cardId) {
    await api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== cardId)
        )
      })
      .catch((error) => console.error(error))
  }

  const handleUpdateUser = (data) => {
    api.editUser(data).then((data) => {
      setCurrentUser(data)
      handleClosePopup()
    })
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatar(data).then((data) => {
      setCurrentUser(data)
      handleClosePopup()
    })
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

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data)
    })
  }, [])

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div className="page">
          <Popup
            title={popup.title}
            reference={popupRef}
            handleClosePopup={handleClosePopup}
          >
            {popup.modal === 'newCard' && (
              <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />
            )}
            {popup.modal === 'editAvatar' && <EditAvatar />}
            {popup.modal === 'editProfile' && <EditProfile />}
          </Popup>
          <Header />
          <div className="error-messages">
            <p className="error-message">Ha ocurrido un error</p>
          </div>
          <Main
            handleSetPopup={handleSetPopup}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
