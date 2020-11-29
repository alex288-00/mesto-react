import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_img ${props.cardOpen ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <button className="popup__close" onClick={props.onClose} />
        <img className="popup__image" src={props.cardData.src} />
        <p className="popup__subtitle">{props.cardData.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
