import React from "react";
import styled from "styled-components";

export const Navbar = styled.nav`
    --webkit-box-orient: vertical;
    --webkit-box-direction: normal;
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: var(--navbar);
    width: var(--navbar-width);
    height: 100%;
    top: 0;

    z-index: 2;
`;

export const NavLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5em;
    margin-top: 0.75em;
    width: 100%;
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
`;

export const NavItem = styled.li`
    list-style: none;
    ${props => {
        if (props.disabled) {
            return `
                pointer-events: none;
                pointer: not-allowed;
            `
        } else {
            return `pointer: cursor;`
        }
    }}

    &>a {
        text-decoration: none;
        color: #000;
        padding: 0.5em 1em;
        display: flex;
        align-items: left;
        font-size: 1.1em;
        ${props => props.active ? "color: var(--text); font-weight: bold;" : "color: var(--text-gray); font-weight: normal;"}
    }

    @media (min-width: 1401px) {
        &>a>svg {
            margin-right: 0.5em;
        }
    }

    @media (max-width: 1400px) {
        margin-bottom: 0.5em;
        &>a {
            font-size: 1.2em;
            align-items: center;
        }
        &>a>span {
            display: none;
        }
    }

`;

export const NavHorizontalRule = styled.hr`
    border: 0.1em solid var(--dark-gray);
    border-radius: 0.15em;
    margin: 0.5em 0.5em 0.5em 0.5em;

`;

export const Account = styled.div`
    padding: 0.5em 1em;
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: fit-content;
    bottom: 0;
`;

export const AccountProfile = styled.div`
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: var(--text);
    margin-right: 0.5em;
`;

export const AccountName = styled.span`
    font-size: 0.8em;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;


export function LogoPC() {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="8em" height="4em" viewBox="0 0 1180.000000 235.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,235.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M216 2329 c-31 -25 -51 -61 -60 -110 -8 -48 12 -1524 24 -1732 5 -89
            16 -184 24 -210 32 -104 108 -159 247 -176 100 -13 1104 -36 1152 -27 121 23
            165 183 67 240 -34 20 -55 21 -530 28 -606 8 -673 13 -685 51 -12 39 -32 1132
            -27 1452 6 365 1 433 -35 475 -23 27 -30 30 -88 30 -48 0 -68 -5 -89 -21z"/>
            <path d="M2116 2320 c-14 -17 -28 -46 -32 -65 -3 -19 1 -173 10 -342 9 -170
            21 -409 27 -533 7 -124 12 -461 13 -750 1 -486 3 -527 19 -551 10 -15 32 -33
            48 -40 92 -37 183 21 199 128 9 59 -5 1147 -20 1488 -14 350 -30 616 -37 640
            -13 46 -32 55 -119 55 -79 0 -83 -1 -108 -30z"/>
            <path d="M2966 2329 c-31 -25 -51 -61 -60 -110 -8 -48 12 -1524 24 -1732 5
            -89 16 -184 24 -210 32 -104 108 -159 247 -176 100 -13 1104 -36 1152 -27 121
            23 165 183 67 240 -34 20 -55 21 -530 28 -606 8 -673 13 -685 51 -12 39 -32
            1132 -27 1452 6 365 1 433 -35 475 -23 27 -30 30 -88 30 -48 0 -68 -5 -89 -21z"/>
            <path d="M6017 2308 c-23 -24 -74 -95 -113 -158 -109 -176 -485 -763 -498
            -778 -9 -9 -28 9 -89 85 -63 80 -405 552 -534 737 -18 25 -47 55 -65 66 -109
            66 -245 -52 -199 -173 5 -14 36 -60 69 -103 32 -44 146 -200 252 -349 106
            -148 246 -337 312 -419 l119 -149 12 -489 12 -490 39 -35 c36 -33 42 -35 92
            -31 58 5 93 28 120 80 17 32 18 222 4 693 l-9 310 71 110 c39 61 175 271 302
            468 320 496 318 493 323 541 6 48 -15 99 -46 116 -11 5 -45 10 -76 10 -52 0
            -58 -3 -98 -42z"/>
            <path d="M6556 2335 c-61 -21 -88 -46 -118 -105 -26 -49 -28 -63 -28 -169 0
            -168 38 -862 99 -1805 l9 -140 35 -32 c49 -45 98 -49 416 -36 339 15 449 35
            597 110 119 60 203 161 270 326 122 299 134 655 37 1071 -104 447 -305 691
            -623 755 -196 40 -612 55 -694 25z m525 -271 c136 -16 180 -30 255 -80 158
            -105 272 -376 319 -754 35 -288 6 -526 -87 -715 -76 -155 -178 -192 -565 -202
            l-222 -6 -5 34 c-7 48 -76 1230 -92 1592 l-7 159 144 -7 c79 -3 196 -13 260
            -21z"/>
            <path d="M8530 2306 c-170 -50 -223 -75 -251 -119 -25 -39 -24 -66 21 -582 39
            -445 47 -746 29 -1060 -20 -343 -19 -407 7 -442 42 -58 68 -63 300 -63 550 0
            917 73 1054 210 49 49 95 139 122 239 30 111 30 313 0 435 -58 232 -188 390
            -398 481 l-73 32 20 29 c43 62 99 189 115 261 25 114 16 269 -20 348 -50 110
            -161 200 -308 249 -72 25 -88 26 -275 26 l-198 -1 -145 -43z m514 -234 c138
            -50 176 -97 176 -218 0 -130 -49 -246 -135 -322 -54 -47 -44 -44 -260 -77 -93
            -14 -184 -28 -202 -31 -30 -6 -32 -4 -37 28 -11 76 -48 568 -43 581 4 12 54
            28 172 57 70 16 262 6 329 -18z m145 -878 c250 -57 393 -264 378 -544 -6 -102
            -27 -185 -55 -219 -53 -65 -328 -111 -760 -126 l-163 -6 8 203 c4 112 8 303 8
            426 0 218 0 223 21 228 11 3 95 18 185 35 177 31 254 32 378 3z"/>
            <path d="M10112 2334 c-19 -13 -22 -21 -16 -47 4 -18 10 -131 13 -252 l6 -220
            115 0 c191 1 240 32 240 156 0 77 -27 123 -95 164 -15 9 -15 13 -1 47 24 56
            20 101 -10 137 -26 31 -26 31 -128 31 -77 0 -107 -4 -124 -16z m160 -34 c49
            -14 63 -40 48 -86 -14 -42 -40 -60 -102 -69 -45 -6 -48 -5 -48 17 0 13 -3 46
            -6 75 l-7 52 34 9 c19 6 36 11 39 11 3 1 22 -4 42 -9z m73 -226 c55 -26 85
            -123 53 -167 -15 -20 -97 -37 -176 -37 l-55 0 7 61 c3 34 6 81 6 105 0 36 3
            43 23 47 50 10 111 6 142 -9z"/>
            <path d="M10553 2334 c-3 -9 -3 -116 1 -237 5 -167 10 -227 21 -243 21 -32
            108 -48 228 -41 99 5 130 17 125 46 -3 14 -23 16 -139 16 -170 0 -169 0 -169
            106 l0 79 124 0 c129 0 156 9 142 45 -4 12 -29 15 -136 15 l-130 0 0 90 0 89
            123 3 c118 3 122 4 125 26 l3 22 -156 0 c-134 0 -156 -2 -162 -16z"/>
            <path d="M10950 2330 c0 -11 6 -20 13 -21 6 0 45 -2 84 -3 40 -1 75 -4 77 -7
            2 -2 9 -103 15 -224 7 -121 14 -230 17 -242 5 -26 38 -31 51 -9 8 14 2 193
            -12 389 l-6 87 75 0 c72 0 106 13 106 41 0 5 -87 9 -210 9 -203 0 -210 -1
            -210 -20z"/>
            <path d="M11501 2318 c-20 -65 -121 -471 -121 -489 0 -24 25 -35 44 -20 8 7
            24 52 36 101 12 50 25 92 29 94 4 3 45 6 91 7 l84 2 40 -114 c38 -104 44 -114
            66 -114 22 0 25 4 24 35 -1 37 -128 402 -167 480 -21 43 -24 45 -69 48 -44 3
            -47 2 -57 -30z m105 -138 c19 -51 32 -96 29 -99 -3 -3 -34 -7 -69 -9 l-63 -4
            26 111 c14 61 29 107 34 102 4 -4 24 -50 43 -101z"/>
            </g>
        </svg>
    )
}

export function LogoMobile() {
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="2em" height="2em" viewBox="0 0 421.000000 630.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,630.000000) scale(0.100000,-0.100000)" stroke="none">
                        <path d="M125 6281 c-45 -20 -91 -69 -112 -118 -11 -27 -13 -285 -13 -1460 0
                        -1663 11 -2314 55 -3498 17 -434 26 -532 61 -653 60 -207 167 -336 330 -398
                        135 -51 485 -96 879 -113 233 -11 1714 -32 2366 -35 l355 -1 49 30 c72 44 109
                        108 109 188 0 34 -6 73 -13 87 -25 47 -75 90 -130 112 -55 21 -67 22 -869 29
                        -1520 14 -2471 55 -2591 112 -39 18 -58 70 -75 202 -30 231 -37 385 -46 970
                        -5 325 -15 768 -21 985 -6 217 -14 1075 -17 1905 -7 1447 -8 1511 -26 1545
                        -61 115 -182 161 -291 111z"/>
                        </g>
                    </svg>
    )
}