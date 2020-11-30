//Клмпонент разметки с карточкой

function Card(props) {
  //Функция с подставлением данных при клике на карточку
  function handleClick() {
    props.onCardClick({
      src: props.src,
      name: props.name,
    });
  }

  return (
    <div className="element">
      <button className="element__trash"></button>
      <img className="element__image" src={props.src} onClick={handleClick} />
      <div className="element__title-like">
        <h3 className="element__title">{props.name}</h3>
        <div className="element__like-counter">
          <button className="element__like"></button>
          <p className="element__counter">{props.like}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
