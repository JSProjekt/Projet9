import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // tableau modifié pour commencer à 0 et enlever l'erreur undefined +1 à index ? à bydatedesc
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {/* delete mauvaise encapsulation */}
      {byDateDesc?.map((event, idx) => (
          /* remplace .title par .date pour ID unique à chaque slider */
          <div key={event.date}>
            <div className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
                 {/* renseignement de l'image correspondante en modif alt */}
            <img src={event.cover} alt={event.title} />
     
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date}
                  // modif key pour correspondre au slider
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // indiquer sur quelle image on se trouve avec index à la place de idx
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
