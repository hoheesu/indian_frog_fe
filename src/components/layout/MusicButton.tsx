import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import indianFrogMainMusic1 from '../../assets/audio/IndianFrog_ver1.1.mp3';
import indianFrogMainMusic2 from '../../assets/audio/indianfrog_ver2.mp3';
import IconSpeaker from '../../assets/images/icons/icon-speaker.svg';
import IconSpeakerMute from '../../assets/images/icons/icon-speaker-mute.svg';
// import { useLocation } from 'react-router-dom';

function MusicButton() {
  const [isBgmPlay, setIsBgmPlay] = useState(true);
  const [bgmTrack, setBgmTrack] = useState(indianFrogMainMusic1);
  // const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const changeBgmTrack = () => {
    setBgmTrack((prev) =>
      prev === indianFrogMainMusic1
        ? indianFrogMainMusic2
        : indianFrogMainMusic1,
    );
  };

  const handleMusicButton = () => {
    setIsBgmPlay((prev) => {
      !prev ? audioRef.current!.play() : audioRef.current!.pause();
      return !prev;
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, []);

  return (
    <PlayButtonContainer>
      <button onClick={handleMusicButton}>
        {isBgmPlay ? (
          <img src={IconSpeaker} alt="음악재생" />
        ) : (
          <img src={IconSpeakerMute} alt="음악중지" />
        )}
      </button>
      {audioRef && (
        <AudioCotroller
          typeof="audio/mp3"
          autoPlay
          ref={audioRef}
          src={bgmTrack}
          onEnded={changeBgmTrack}
        ></AudioCotroller>
      )}
    </PlayButtonContainer>
  );
}
const PlayButtonContainer = styled.div`
  margin-top: 2px;
  position: relative;
  button {
    @media (max-height: 600px) {
      img {
        width: 26px;
      }
    }
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
