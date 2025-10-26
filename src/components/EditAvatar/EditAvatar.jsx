export default function EditAvatar() {
  return (
    <form action="#" className="form" id="form-change-avatar" novalidate>
      <div className="form__field">
        <input
          type="url"
          className="form__input"
          placeholder="Enlace a la imagen"
          id="avatar-link"
          name="avatar"
          value=""
          required
        />
        <p className="form__error"></p>
      </div>
      <button type="submit" className="form__button" id="avatar-button-form">
        Guardar
      </button>
    </form>
  )
}
