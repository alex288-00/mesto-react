import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  //Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
          <div className="profile__update">
            <button className="profile__update-btn" onClick={onEditAvatar} />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h2 className="profile__info-name">{currentUser.name}</h2>
            <button
              className="profile__info-editbutton"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button className="profile__info-addbutton" onClick={onAddPlace} />
      </section>

      <section className="elements">
        {cards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
