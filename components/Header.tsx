import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import HomeIcon from './header/HomeIcon';
import SearchIcon from './header/SearchIcon';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  button, span {
    margin: 1rem clamp(20%, 20%, 1200px);
  }
`;

const Header: NextPage = () => (
  <StyledHeader>
    <Link href="/">
      <span title="home">
        <HomeIcon strokeColor="black" />
      </span>
    </Link>
    <button type="button" title="search">
      <SearchIcon strokeColor="black" />
    </button>
  </StyledHeader>
);

export default Header;
