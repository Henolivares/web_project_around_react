export default function NewCard({ onAddPlaceSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlaceSubmit({
      name: e.target.imageTitle.value,
      link: e.target.imageLink.value
    })
  }

  return (
    <form
      action="#"
      className="form"
      id="form-add"
      novalidate
      onSubmit={handleSubmit}
    >
      <div className="form__field">
        <input
          type="text"
          className="form__input"
          placeholder="Titulo"
          id="image-title"
          name="imageTitle"
          minlength="2"
          maxlength="30"
          required
        />
        <p className="form__error"></p>
      </div>
      <div className="form__field form__field--with-margin">
        <input
          type="url"
          className="form__input"
          placeholder="Enlace a la imagen"
          id="image-link"
          name="imageLink"
          required
        />
        <p className="form__error"></p>
      </div>
      <button type="submit" className="form__button" id="add-button-form">
        Crear
      </button>
    </form>
  )
}
