import { useEffect } from 'react'
import closeIcon from '../../../images/CloseIcon.svg'

export default function Popup({ title, reference, children }) {
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
    <dialog className="dialog" id="dialog-profile" ref={reference}>
      <button className="dialog__close" onClick={handleClosePopup}>
        <img src={closeIcon} alt="Close icon" />
      </button>
      <p className="dialog__title">{title}</p>
      {children}
    </dialog>
  )
}
