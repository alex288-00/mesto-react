import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, textBtn }) {
  //Используем реф инпута названия карточки
  const textInputName = useRef();
  //Используем реф инпута ссылки на карточку
  const textInputLink = useRef();

  //Обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: textInputName.current.value,
      link: textInputLink.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
      textBtn={textBtn}
      children={
        <>
          <input
            className="popup__input popup__input_mesto"
            id="mesto-input"
            name="name"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            ref={textInputName}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="mesto-input-error"
          />
          <input
            className="popup__input popup__input_link"
            id="link-input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            ref={textInputLink}
            required
          />
          <span
            className="popup__error popup__error_visible"
            id="link-input-error"
          />
        </>
      }
    />
  );
}

export default AddPlacePopup;
