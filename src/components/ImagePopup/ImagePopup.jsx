import closeIcon from '../../images/CloseIcon.svg'
import { useEffect } from 'react'

export default function ImagePopup({ imageUrl, imageDescription, reference }) {
  const handleClosePopup = () => {
    reference.current.close()
  }

  useEffect(() => {
    const popup = reference.current

    const handleCloseWithEsc = (evt) => {
      if (evt.key === 'Escape') {
        popup.close()
      }
    }
    popup.addEventListener('keyup', handleCloseWithEsc)

    return () => {
      popup.removeEventListener('keyup', handleCloseWithEsc)
    }
  }, [reference])

  return (
    <dialog
      className="dialog dialog_image-container"
      id="dialog-image"
      ref={reference}
    >
      <button className="dialog__close" onClick={handleClosePopup}>
        <img src={closeIcon} alt="Close icon" />
      </button>
      <img src={imageUrl} alt={imageDescription} className="dialog__image" />
      <p className="dialog__paragraph">{imageDescription}</p>
    </dialog>
  )
}
