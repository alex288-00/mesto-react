import { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, textBtn }) {
  //Используем реф инпута аватара
  const textInput = useRef();

  //Обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: textInput.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="update-avatar"
      nameForm="update-avatar"
      title="Обновить аватар"
      textBtn={textBtn}
      children={
        <>
          <input
            className="popup__input popup__input_link"
            id="link-input"
            name="avatar"
            type="url"
            placeholder="Ссылка на картинку"
            ref={textInput}
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

export default EditAvatarPopup;
