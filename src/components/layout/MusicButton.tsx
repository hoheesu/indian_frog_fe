import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import indianFrogMainMusic1 from '../../assets/audio/IndianFrog_ver1.1.mp3';
import indianFrogMainMusic2 from '../../assets/audio/indianfrog_ver2.mp3';
import musicPlay from '../../assets/images/icons/musicPlay.svg';
import { useLocation } from 'react-router-dom';

function MusicButton() {
  const [isControls, setIsControls] = useState(false);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, []);
  return (
    <PlayButtonContainer>
      <button onClick={() => setIsControls((prev) => !prev)}>
        <img src={musicPlay} />
      </button>
      <AudioCotroller
        typeof="audio/mp3"
        ref={audioRef}
        src={
          location.pathname.substring(1, 9) === 'gameroom'
            ? indianFrogMainMusic1
            : indianFrogMainMusic2
        }
        autoPlay
        controls={isControls}
        loop={true}
      ></AudioCotroller>
    </PlayButtonContainer>
  );
}
const PlayButtonContainer = styled.div`
  z-index: 99;
  position: relative;
  button {
  }
`;
const AudioCotroller = styled.audio`
  position: absolute;
  left: 50%;
  bottom: -70px;
  transform: translateX(-50%);
  &::-webkit-media-controls-panel {
    background-color: #fffdee;
  }
  filter: drop-shadow(-2px -2px 5px rgba(65, 65, 65, 0.1));
`;
export default MusicButton;
