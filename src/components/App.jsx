import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

import NewCard from '../components/NewCard/NewCard'
import EditProfile from '../components/EditProfile/EditProfile'
import EditAvatar from '../components/EditAvatar/EditAvatar'
import Popup from './Main/Popup/Popup'

import { useRef, useState } from 'react'

function App() {
  const [popup, setPopup] = useState({ modal: 'newCard', title: 'Nuevo lugar' })
  const popupRef = useRef(null)

  const handleSetPopup = (popupName) => {
    setPopup(popupName)
    handleOpenPopup()
  }

  const handleOpenPopup = () => {
    popupRef.current.showModal()
  }

  return (
    <>
      <div className="page">
        <Popup title={popup.title} reference={popupRef}>
          {popup.modal === 'newCard' && <NewCard />}
          {popup.modal === 'editAvatar' && <EditAvatar />}
          {popup.modal === 'editProfile' && <EditProfile />}
        </Popup>
        <Header />
        <div className="error-messages">
          <p className="error-message">Ha ocurrido un error</p>
        </div>
        <Main handleSetPopup={handleSetPopup} />
        <Footer />
      </div>
    </>
  )
}

export default App
