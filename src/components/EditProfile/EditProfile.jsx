export default function EditProfile() {
  return (
    <form action="#" className="form" id="form-profile" novalidate>
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
        />
        <p className="form__error"></p>
      </div>
      <button type="submit" className="form__button" id="save-profile-button">
        Guardar
      </button>
    </form>
  )
}
