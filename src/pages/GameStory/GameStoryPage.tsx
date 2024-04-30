import styled from 'styled-components';
import storyBackground from '../../assets/images/story/storyBackground.png';

function GameStoryPage() {
  return (
    <StoryContainer>
      {/* <TextContent>안녕하세요</TextContent> */}
      <div></div>
    </StoryContainer>
  );
}

const StoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${storyBackground});
  background-size: cover;
  background-position: bottom;
`;

export default GameStoryPage;
