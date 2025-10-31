import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api'
import { useState, useEffect } from 'react'

function App() {
  const [cards, setCards] = useState([])
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

  const handleUpdateUser = async (data) => {
    return api.editUser(data).then((data) => {
      setCurrentUser(data)
    })
  }

  const handleUpdateAvatar = async (data) => {
    return api.editAvatar(data).then((data) => {
      setCurrentUser(data)
    })
  }

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data)
    })
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
        <div className="page">
          <Header />
          <div className="error-messages">
            <p className="error-message">Ha ocurrido un error</p>
          </div>
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onUpdateUser={handleUpdateUser}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
