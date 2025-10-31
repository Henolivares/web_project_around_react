import { useRef } from 'react'

export default function EditAvatar({ onUpdateAvatar }) {
  const avatarRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateAvatar({ avatar: avatarRef.current.value })
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
