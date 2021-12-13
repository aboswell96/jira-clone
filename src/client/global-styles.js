import { createGlobalStyle } from 'styled-components';
import CircularStdBook from './res/fonts/CircularStd-Book.otf';
import CircularStdMedium from './res/fonts/CircularStd-Medium.otf';
import CircularStdFont from './res/fonts/CircularStd-Font.otf';

const GlobalStyle = createGlobalStyle`

    body {
        margin: 0;
    }

    @font-face {
        font-family: CircularStdBook;
        src: url(${CircularStdBook});
    }

    @font-face {
        font-family: CircularStdMedium;
        src: url(${CircularStdMedium});
    }

    @font-face {
        font-family: CircularStdFont;
        src: url(${CircularStdFont});
    }
`

export default GlobalStyle;