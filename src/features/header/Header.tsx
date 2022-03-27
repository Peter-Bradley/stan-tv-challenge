import logo from '../../logo.svg';
import styled from 'styled-components';

let AppHeader = styled.header`
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  z-index: 9;`

let AppLogo = styled.img`
  height: 10vmin;
  pointer-events: none;
  align-self: flex-start;
  padding-left: 3%;`

function Header() {
    return (
        <AppHeader>
          <AppLogo src={logo} alt="Stan Logo" />
        </AppHeader>
    );
  }
  
export default Header;