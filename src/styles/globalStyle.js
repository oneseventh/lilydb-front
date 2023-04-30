const { createGlobalStyle } = require("styled-components");

export const GlobalStyle = createGlobalStyle`
    :root {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.background};
        --success: #198754;
        --danger: #dc3545;
        --primary: #0d6efd;
        --warning: #ffc107;
        --white: #fff;

        --navbar: ${({ theme }) => theme.navbar};
        --home-navbar: ${({ theme }) => theme.homeNavbar};
        --text: ${({ theme }) => theme.text};
        --gtext: ${({ theme }) => theme.gtext};
        --link: ${({ theme }) => theme.link};
        --text-gray: ${({ theme }) => theme.textGray};
        --reverse-text: ${({ theme }) => theme.reverseText};

        --border: ${({ theme }) => theme.border};
        --bg: ${({ theme }) => theme.bg};

        --scroll-bar: ${({ theme }) => theme.scrollBar};
        --scroll-bar-thumb: ${({ theme }) => theme.scroolBarThumb};

        --gray: #6c757d;
        --dark-gray: ${({ theme }) => theme.darkGray};
        --red: #dc3545;
        --yellow: #F9CE00;
        --blue: #0d6efd;
        --pink: #d63384;
        --green: #198754;
        --purple: #6f42c1;
        --orange: #fd7e14;

        --navbar-width: 240px;
        --footer-height: 4em;

        @media (max-width: 1400px) {
            --navbar-width: 65px;
        }

        @media (max-width: 768px) {
            --navbar-width: 0;
            --footer-height: 3.5em;
        }

        font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif, NanumBarunGothic, NanumGothic;
    }

    html {
        overflow-x: hidden;
    }

    body {
        margin: 0;
        height: 100vh;
        overflow-x: hidden;
    }

    svg {
        fill: ${({ theme }) => theme.text};
    }
`;

export default GlobalStyle;