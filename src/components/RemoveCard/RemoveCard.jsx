export default function RemoveCard() {
  return (
    <form action="#" className="form" id="form-delete-card" novalidate>
      <p className="form__paragraph">¿Estás seguro/a?</p>
      <button
        type="submit"
        className="form__button form__button--no-margin"
        id="delete-button-form"
      >
        Sí
      </button>
    </form>
  )
}
