// import { useTheme } from 'styled-components';
// import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';

/* eslint-disable */
import styled from 'styled-components';
import LOGO from '../../../assets/itublockchain-logo.jpeg';
const Wrapper = styled.div`
  height: 500px;
  border: 1px solid ${({ theme }) => theme.colors.border.snapshot};
  min-width: 250px;
  border-radius: 10px;
  color: red;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

const ITUBCLOGO = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
  margin-top: 20px;
`;

const ITUBlockchain = styled.div`
  font-size: 22px;
  margin-top: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};
`;

const MemberCount = styled.div`
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Profile = () => {
  // const theme = useTheme();

  return (
    <Wrapper>
      <ITUBCLOGO src={LOGO}></ITUBCLOGO>
      <ITUBlockchain>ITU BLOCKCHAIN</ITUBlockchain>
      <MemberCount>2 members</MemberCount>
    </Wrapper>
  );
};

export { Profile };
