import DECK1_CARD1 from '../../assets/images/cards/DECK1_CARD1.svg';
import DECK1_CARD2 from '../../assets/images/cards/DECK1_CARD2.svg';
import DECK1_CARD3 from '../../assets/images/cards/DECK1_CARD3.svg';
import DECK1_CARD4 from '../../assets/images/cards/DECK1_CARD4.svg';
import DECK1_CARD5 from '../../assets/images/cards/DECK1_CARD5.svg';
import DECK1_CARD6 from '../../assets/images/cards/DECK1_CARD6.svg';
import DECK1_CARD7 from '../../assets/images/cards/DECK1_CARD7.svg';
import DECK1_CARD8 from '../../assets/images/cards/DECK1_CARD8.svg';
import DECK1_CARD9 from '../../assets/images/cards/DECK1_CARD9.svg';
import DECK1_CARD10 from '../../assets/images/cards/DECK1_CARD10.svg';
import DECK2_CARD1 from '../../assets/images/cards/DECK2_CARD1.svg';
import DECK2_CARD2 from '../../assets/images/cards/DECK2_CARD2.svg';
import DECK2_CARD3 from '../../assets/images/cards/DECK2_CARD3.svg';
import DECK2_CARD4 from '../../assets/images/cards/DECK2_CARD4.svg';
import DECK2_CARD5 from '../../assets/images/cards/DECK2_CARD5.svg';
import DECK2_CARD6 from '../../assets/images/cards/DECK2_CARD6.svg';
import DECK2_CARD7 from '../../assets/images/cards/DECK2_CARD7.svg';
import DECK2_CARD8 from '../../assets/images/cards/DECK2_CARD8.svg';
import DECK2_CARD9 from '../../assets/images/cards/DECK2_CARD9.svg';
import DECK2_CARD10 from '../../assets/images/cards/DECK2_CARD10.svg';
import CARD_COVER from '../../assets/images/cards/CARD_COVER.svg';
import styled from 'styled-components';

interface CardProps {
  cardNumber?: string;
}
function CardImages({ cardNumber }: CardProps) {
  return (
    <CardWrapper>
      {(() => {
        switch (cardNumber) {
          case 'DECK1_CARD1':
            return <img src={DECK1_CARD1} alt="" />;
          case 'DECK1_CARD2':
            return <img src={DECK1_CARD2} alt="" />;
          case 'DECK1_CARD3':
            return <img src={DECK1_CARD3} alt="" />;
          case 'DECK1_CARD4':
            return <img src={DECK1_CARD4} alt="" />;
          case 'DECK1_CARD5':
            return <img src={DECK1_CARD5} alt="" />;
          case 'DECK1_CARD6':
            return <img src={DECK1_CARD6} alt="" />;
          case 'DECK1_CARD7':
            return <img src={DECK1_CARD7} alt="" />;
          case 'DECK1_CARD8':
            return <img src={DECK1_CARD8} alt="" />;
          case 'DECK1_CARD9':
            return <img src={DECK1_CARD9} alt="" />;
          case 'DECK1_CARD10':
            return <img src={DECK1_CARD10} alt="" />;
          case 'DECK2_CARD1':
            return <img src={DECK2_CARD1} alt="" />;
          case 'DECK2_CARD2':
            return <img src={DECK2_CARD2} alt="" />;
          case 'DECK2_CARD3':
            return <img src={DECK2_CARD3} alt="" />;
          case 'DECK2_CARD4':
            return <img src={DECK2_CARD4} alt="" />;
          case 'DECK2_CARD5':
            return <img src={DECK2_CARD5} alt="" />;
          case 'DECK2_CARD6':
            return <img src={DECK2_CARD6} alt="" />;
          case 'DECK2_CARD7':
            return <img src={DECK2_CARD7} alt="" />;
          case 'DECK2_CARD8':
            return <img src={DECK2_CARD8} alt="" />;
          case 'DECK2_CARD9':
            return <img src={DECK2_CARD9} alt="" />;
          case 'DECK2_CARD10':
            return <img src={DECK2_CARD10} alt="" />;
          default:
            return <img src={CARD_COVER} alt="" />;
        }
      })()}
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  @media (max-height: 900px) {
    height: 250px;
  }
  @media (max-height: 700px) {
    height: 200px;
  }
  @media (max-height: 600px){
    height: 160px;
  }
  height: 300px;
  transition: height 0.1s ease-in;
  img {
    height: 100%;
  }
`;

export default CardImages;
