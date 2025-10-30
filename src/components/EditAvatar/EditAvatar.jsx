import { useRef, useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

export default function EditAvatar() {
  const avatarRef = useRef(null)
  const { handleUpdateAvatar } = useContext(CurrentUserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateAvatar({ avatar: avatarRef.current.value })
  }

  return (
    <form
      action="#"
      className="form"
      id="form-change-avatar"
      novalidate
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          type="url"
          className="form__input"
          placeholder="Enlace a la imagen"
          id="avatar-link"
          name="avatar"
          required
          ref={avatarRef}
        />
        <p className="form__error"></p>
      </div>
      <button type="submit" className="form__button" id="avatar-button-form">
        Guardar
      </button>
    </form>
  )
}
