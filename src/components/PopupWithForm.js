//Компонент с общей разметкой попапов

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form className={`popup__form popup__form_${props.nameForm} `} noValidate>
        <h2 className="popup__title popup__title_profile">{props.title}</h2>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        {props.children}
        <button type="submit" className="popup__button">
          {props.textBtn}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
