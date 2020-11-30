//Компонент попапа изображения

function ImagePopup(props) {
  return (
    <div className={`popup popup_img ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <button className="popup__close" onClick={props.onClose} />
        <img
          className="popup__image"
          src={props.card.src}
          alt={props.card.name}
        />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
