import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import storyBackground from '../../assets/images/story/storyBackground.png';
import textCursor from '../../assets/images/story/textCursor.png';
import story2_1 from '../../assets/images/story/story2_image1.png';
import story4_1 from '../../assets/images/story/story4_image1.png';
import story6_1 from '../../assets/images/story/story6_image1.png';
import story8_1 from '../../assets/images/story/story8_image1.png';
import wellFrog from '../../assets/images/story/wellFrog.png';
import wellImage from '../../assets/images/story/wellImage.png';
import story10_1 from '../../assets/images/story/story10_image1.png';
import story13_1 from '../../assets/images/story/story13_image1.png';
import story18_1 from '../../assets/images/story/story18_image1.png';
import story22_1 from '../../assets/images/story/story22_image1.png';
import rockImg from '../../assets/images/story/rock.png';
import skipIcon from '../../assets/images/icons/icon-skip.svg';
import { useIsModalStore } from '../../store/modal/CreateModalStore';

function GameStoryPage() {
  const storyContents = [
    '옛날 옛적 어느날......\n인디안 개구리 한마리가 도를 닦기 위해 홀로 수행을 떠나고 있었습니다.',
    '목이 마르군… 개굴 ',
    '우물을 찾아 나무 아래 그늘로 향한 인디안 개구리는 \n우물 안에서 한 개구리를 발견하는데….',
    '개구리야 그 안에서 무엇을 하고 있느냐 개굴 ',
    '평생 우물 안에서 살던 개구리는 고개를 들어\n 둥근 하늘의 작은 그늘을 바라보았습니다.',
    '당신은 누구신가요? 저는 이 우물의 제일가는 타짜 개구리입니다 ',
    '나는 인디안 개구리다 개굴! 너는 왜 그 작은 곳에 살고 있는가!\n 나와 대결하지 않겠는가 개굴! ',
    '인디안 개구리는 우물안 개구리를 물동이로 건져내어 결투를 신청하였습니다.',
    '자, 여기서 나와 결투를 하자 개굴, 나를 이기면 이 곳에 계속 살아도 좋다!\n 그러나 나에게 진다면 너는 이제 영영 우물에 살 수 없다! ',
    '엥? 제가 왜요 ',
    '개굴아 나도 순정이 있다. \n니가 이런 식으로 내 순정을 짓밟으면 깡패가 되는 거야! 좋은 게임을 알려주지 개굴! ',
    '우물 안 개구리는 떨떠름한 마음으로 인디안 개구리의 제안을 받아들였습니다.',
    '우리가 할 게임은 인디안 개구리 부족의 전통게임 인디안 포커다!\n 자! 이제부터 우물 안 개구리와 인디안 개구리의 결투가 시작된다! ',
    '(인디안 개구리가 패를 섞는다) 아수라 발발타.. 아수라 발발타.. ',
    '싸늘하다. 가슴에 비수가 날아와 꽂힌다.\n 하지만 걱정하지 마라. 손은 눈보다 빠르니까.',
    '성공하면 200, 실패하면 404! 묻고 따블로 가! 개굴!',
    '몇 번의 결투 끝에도 우물안 개구리는 인디안 개구리를 이기지 못했습니다.',
    '저는 당신의 패를 아는데도 왜 매번 지고 마는 겁니까, 인디안 개구리님….',
    '너는 아직도 네 자신을 모르는구나,\n 우물 안에서만 살아온 개구리야, 남을 이기려 들지 말고 너를 알기 위해 노력하거라 개굴!',
    '인생은 결국에 나를 알아야 이길 수 있 다는 사실을 우물안 개구리는 이제야 깨달았습니다.',
    '우물안 개구리는 우물을 떠나 나를 찾는 여행을 시작하기로 다짐했습니다.',
    '남의 패만 아는 인생은 더이상 싫어! 자! 이제 내 패를 까보자!',
  ];
  const storySpeaker = [
    0, 1, 0, 1, 0, 2, 1, 0, 1, 2, 1, 0, 1, 1, 2, 1, 0, 2, 1, 0, 0, 2,
  ];
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);

  useEffect(() => {
    if (currentIndex < storyContents.length) {
      const intervalId = setInterval(() => {
        if (text.length < storyContents[currentIndex].length) {
          setText(
            (prevText) =>
              prevText + storyContents[currentIndex][prevText.length],
          );
        } else {
          clearInterval(intervalId);
        }
      }, 40); // 한 글자씩 나타낼 간격(ms)

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, storyContents, text]);

  const handleNext = () => {
    if (currentIndex < storyContents.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setText('');
    } else if (currentIndex === storyContents.length - 1) {
      useSetIsModalClick('storyOver');
    }
  };

  return (
    <StoryContainer>
      <StoryBox>
        <SkipButton
          onClick={() => {
            useSetIsModalClick('storyOver');
          }}
        >
          Skip
          <img src={skipIcon} alt="" />
        </SkipButton>
        <StoryBoxBtn onClick={handleNext}>
          <TextContent>
            <div>
              <p>
                {text}
                <img src={textCursor} />
              </p>
            </div>
            <Speaker
              className={
                storySpeaker[currentIndex] === 0
                  ? 'commentary'
                  : storySpeaker[currentIndex] === 1
                    ? 'indian-frog'
                    : 'well-frog'
              }
            >
              {!storySpeaker[currentIndex] ? (
                <img src={rockImg} alt="" />
              ) : null}
              {!storySpeaker[currentIndex]
                ? '해설 개굴'
                : storySpeaker[currentIndex] === 1
                  ? '인디안 개구리'
                  : '우물안 개구리'}
            </Speaker>
            <SpeakerCharacter>
              <img
                src={(() => {
                  switch (currentIndex + 1) {
                    case 2:
                      return story2_1;
                    case 4:
                      return story4_1;
                    case 6:
                      return story6_1;
                    case 7:
                      return story4_1;
                    case 8:
                      return story8_1;
                    case 9:
                      return story8_1;
                    case 10:
                      return story10_1;
                    case 11:
                      return story8_1;
                    case 13:
                      return story13_1;
                    case 14:
                      return story13_1;
                    case 15:
                      return story10_1;
                    case 16:
                      return story13_1;
                    case 18:
                      return story18_1;
                    case 19:
                      return story4_1;
                    case 22:
                      return story22_1;
                  }
                })()}
                alt=""
              />
            </SpeakerCharacter>
            <WellFrogImage>
              <img
                src={currentIndex === 7 || currentIndex === 8 ? wellFrog : ''}
                alt=""
              />
            </WellFrogImage>
            <WellImage>
              <img
                src={currentIndex === 0 || currentIndex === 21 ? '' : wellImage}
                alt=""
              />
            </WellImage>
          </TextContent>
        </StoryBoxBtn>
      </StoryBox>
    </StoryContainer>
  );
}

const StoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background-image: url(${storyBackground});
  background-size: cover;
  background-position: bottom;
`;
const StoryBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 1460px;
  margin: 80px auto;
  padding: 0 20px;
  @media (max-height: 600px) or (max-width: 1110px) {
    margin: 20px auto;
  }
`;
const StoryBoxBtn = styled.button`
  position: relative;
  width: 100%;
  z-index: 10;
`;
const boxFade = keyframes`
 0% {
    visibility: visible;
  }
  50% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
`;

const TextContent = styled.div`
  width: 100%;
  height: 200px;
  & > div:nth-child(1) {
    padding: 30px;
    display: flex;
    width: 100%;
    height: 100%;
    border: 10px solid #decfaa;
    border-radius: 30px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    & > p {
      white-space: pre-line;
      font-size: 30px;
      text-align: left;
      color: #375401;
      line-height: 1.5;
      & > img {
        margin-left: 20px;
        animation: ${boxFade} 1s step-start infinite;
      }
    }
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    height: 100px;
    & > div:nth-child(1) {
      padding: 15px;
      border-width: 5px;
      border-radius: 10px;
      & > p {
        font-size: 18px;
      }
    }
  }
`;

const Speaker = styled.div`
  position: absolute;
  padding: 20px 40px;
  min-width: 200px;
  font-size: 30px;
  left: 4%;
  top: -50px;
  z-index: 3;
  border-radius: 30px;
  color: #fff;
  font-weight: 500;
  font-family: 'NPSfontBold';
  &.commentary {
    background-color: #4f4f4f;
    & > img {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
    }
  }
  &.indian-frog {
    background-color: #ef6600;
  }
  &.well-frog {
    background-color: #76b400;
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    top: -30px;
    padding: 10px 20px;
    min-width: 100px;
    border-radius: 15px;
    font-size: 18px;
    &.commentary {
      & > img {
        position: absolute;
        top: 0px;
        width: 60px;
        transform: translateY(-50%);
      }
    }
  }
`;
const SpeakerCharacter = styled.div`
  position: absolute;
  top: -230px;
  left: 6.8%;
  z-index: -1;
  @media (max-height: 600px) or (max-width: 1110px) {
    max-width: 140px;
    top: -170px;
    left: 5%;
    img {
      width: 100%;
    }
  }
`;
const WellFrogImage = styled.div`
  position: absolute;
  top: 0;
  left: 30%;
  z-index: 1;
  transform: translateY(-110%);
  @media (max-height: 600px) or (max-width: 1110px) {
    max-width: 130px;
    img {
      width: 100%;
    }
  }
`;
const WellImage = styled.div`
  position: absolute;
  top: -180px;
  left: 50%;
  z-index: -1;
  @media (max-height: 600px) or (max-width: 1110px) {
    max-width: 300px;
    top: -110px;
    left: 55%;
    img {
      width: 100%;
    }
  }
`;
const SkipButton = styled.button`
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  margin-left: auto;
  margin-bottom: 30px;
  color: #fff;
  font-size: 30px;
  padding: 10px 20px;
  border-radius: 100px;
  background-color: var(--color-main);
  border: 3px solid #fff;
  &:hover {
    background-color: #81c008;
  }
  @media (max-height: 600px) or (max-width: 1110px) {
    margin-bottom: 10px;
    font-size: 16px;
    padding: 5px 10px;
    min-width: 110px;
  }
`;

export default GameStoryPage;
