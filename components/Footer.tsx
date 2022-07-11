import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #505955;
  text-align: center;
  margin-top: auto;
  padding: 1rem 0;
  p {
    margin: 0;
  }
`;

const Footer: NextPage = () => (
  <StyledFooter>
    <button type="button" title="theme toggle">
      <Image src="/images/theme-toggle-icon.svg" width={50} height={50} />
    </button>
    <p>
      Have a nice day
      {' '}
      <Link href="wide-cat"> &#128512;</Link>
    </p>
  </StyledFooter>
);

export default Footer;
