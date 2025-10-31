import { useContext, useState } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function EditProfile({ onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext)

  const [name, setName] = useState(currentUser.name)
  const [about, setAbout] = useState(currentUser.about)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleAboutChange = (e) => {
    setAbout(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({ name, about })
  }

  return (
    <form
      action="#"
      className="form"
      id="form-profile"
      novalidate
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          type="text"
          className="form__input"
          placeholder="Nombre"
          id="name"
          name="name"
          minlength="2"
          maxlength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <p className="form__error"></p>
      </div>
      <div className="form__field form__field--with-margin">
        <input
          type="text"
          className="form__input"
          placeholder="Acerca de mi"
          id="about"
          name="about"
          minlength="2"
          maxlength="200"
          required
          value={about}
          onChange={handleAboutChange}
        />
        <p className="form__error"></p>
      </div>
      <button type="submit" className="form__button" id="save-profile-button">
        Guardar
      </button>
    </form>
  )
}
