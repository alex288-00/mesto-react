import { useEffect, useState } from "react";

import Card from "./Card.js";
import api from "../utils/Api.js";

function Main(props) {
  const [userName, setUserName] = useState("");

  const [userDescription, setUserDescription] = useState("");

  const [userAvatar, setUserAvatar] = useState("#");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        const cards = res.map((item) => {
          return {
            src: item.link,
            id: item._id,
            name: item.name,
            like: item.likes.length,
          };
        });
        setCards(cards);
      })

      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setUserName(res);
        setUserDescription(res);
        setUserAvatar(res);
      })
      .catch((err) => {
        console.log("Произошла ошибка:", err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={userAvatar.avatar}
            alt={userName.name}
          />
          <div className="profile__update">
            <button
              className="profile__update-btn"
              onClick={props.onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h2 className="profile__info-name">{userName.name}</h2>
            <button
              className="profile__info-editbutton"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__info-job">{userDescription.about}</p>
        </div>
        <button
          className="profile__info-addbutton"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        {cards.map((item) => {
          return (
            <Card
              key={item.id}
              src={item.src}
              name={item.name}
              like={item.like}
              onCardClick={props.onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
