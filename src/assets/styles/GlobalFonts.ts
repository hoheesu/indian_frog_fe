import { createGlobalStyle } from 'styled-components';
import PretendardRegularFont from '../fonts/Pretendard-Regular.woff';
import PretendardMediumFont from '../fonts/Pretendard-Medium.woff';
import PretendardSemiBoldFont from '../fonts/Pretendard-SemiBold.woff';
import PretendardBoldFont from '../fonts/Pretendard-Bold.woff';
import PretendardExtraBoldFont from '../fonts/Pretendard-ExtraBold.woff';
import NpsBoldFont from '../fonts/NPSfont_bold.woff';
import NpsRegularFont from '../fonts/NPSfont_regular.woff';
const GlobalFonts = createGlobalStyle`
@font-face {
    font-family: 'Pretendard Regular';
    src: local('Pretendard Regular'),
      url(${PretendardRegularFont}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard Medium';
    src: local('Pretendard Medium'),
      url(${PretendardMediumFont}) format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard SemiBold';
    src: local('Pretendard SemiBold'),
      url(${PretendardSemiBoldFont}) format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard Bold';
    src: local('Pretendard Bold'),
      url(${PretendardBoldFont}) format('opentype');
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard ExtraBold';
    src: local('Pretendard ExtraBold'),
      url(${PretendardExtraBoldFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'NPSfontRegular';
    src: local('NPSfontRegular'),
      url(${NpsRegularFont}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'NPSfontBold';
    src: local('NPSfontBold'),
      url(${NpsBoldFont}) format('opentype');
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }

`;

export default GlobalFonts;
