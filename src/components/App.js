import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import React, { useState } from "react";
import "../index.css";

function App() {
  // Переменные состояния профиля и обработчики для открытия попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Переменная состояния для карточки
  const [selectedCard, setSelectedCard] = useState(false);

  //Функция открытия попапа изображения и передачи данных для карточки
  function handleCardClick(props) {
    setSelectedCard({
      src: props.src,
      name: props.name,
    });
  }

  //Функия закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="profile"
        nameForm="profile"
        title="Редактировать профиль"
        textBtn="Сохранить"
        children={
          <>
            {" "}
            <input
              className="popup__input popup__input_name"
              id="name-input"
              name="name"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={40}
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="name-input-error"
            />
            <input
              className="popup__input popup__input_job"
              id="job-input"
              name="about"
              type="text"
              placeholder="Описание"
              minLength={2}
              maxLength={200}
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="job-input-error"
            />{" "}
          </>
        }
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="add-card"
        nameForm="add-card"
        title="Новое место"
        textBtn="Создать"
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
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="link-input-error"
            />
          </>
        }
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="update-avatar"
        nameForm="update-avatar"
        title="Обновить аватар"
        textBtn="Сохранить"
        children={
          <>
            <input
              className="popup__input popup__input_link"
              id="link-input"
              name="avatar"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span
              className="popup__error popup__error_visible"
              id="link-input-error"
            />
          </>
        }
      />

      <PopupWithForm name="form-confirm" title="Вы уверены?" textBtn="Да" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
