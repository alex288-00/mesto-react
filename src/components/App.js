import api from "../utils/api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "../index.css";

function App() {
  //Переменная состояния данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  //Прелоадер для обновления аватара и данных пользователя
  const [loader, setLoader] = useState("Сохранить");

  //Прелоадер для добавления карточки
  const [placeLoader, setPlaceLoader] = useState("Создать");

  // Переменные состояния и обработчики для открытия попапов
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

  //Переменные состояния для карточки
  const [selectedCard, setSelectedCard] = useState(false);
  const [cards, setCards] = useState([]);

  //Функция открытия попапа изображения и передачи данных для карточки
  function handleCardClick(card) {
    setSelectedCard({
      src: card.src,
      name: card.name,
    });
  }

  //Функия закрытия попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  //Обработчик изменения данных пользователя
  function handleUpdateUser(userData) {
    setLoader("Сохранение..");
    api
      .patchUserData(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })
      .finally(() => {
        setLoader("Сохранить");
      });
    closeAllPopups();
  }

  //Обработчик аватара пользователя
  function handleUpdateAvatar(userData) {
    setLoader("Сохранение..");
    api
      .patchUserAvatar(userData)
      .then((userAva) => {
        setCurrentUser(userAva);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })

      .finally(() => {
        setLoader("Сохранить");
      });

    closeAllPopups();
  }

  //Обработчик создания новой карточки
  function handleAddPlaceSubmit(cardData) {
    setPlaceLoader("Создание..");
    api
      .postAddCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      })
      .finally(() => {
        setPlaceLoader("Создать");
      });
    closeAllPopups();
  }

  //Обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  //Обработчик удаления карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCardData = cards.filter((c) => c._id !== card._id);
      setCards(newCardData);
    });
  }

  //Эффект совершает запрос в API за карточками
  useEffect(() => {
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  }, []);

  //Эффект совершает запрос в API за данными пользователя
  useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textBtn={loader}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textBtn={loader}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          textBtn={placeLoader}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
