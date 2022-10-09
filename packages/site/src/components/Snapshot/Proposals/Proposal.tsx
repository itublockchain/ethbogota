// import { useTheme } from 'styled-components';
// import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';

/* eslint-disable */
import styled from 'styled-components';
import LOGO from '../../../assets/itublockchain-logo.jpeg';
import { useTypedSelector } from '../../../store';
const Wrapper = styled.div`
  // min-height: 200px;
  // height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.border.snapshot};
  min-width: 650px;
  border-radius: 10px;
  color: red;
  display: flex;
  flex-direction: column;
  padding: 20px;
  // align-items: center;
  cursor: pointer;

  &:hover {
    border: 1px solid rgb(221, 201, 245);
  }
`;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Active = styled.div`
  width: 75px;
  height: 30px;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(216, 251, 216);
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  margin-top: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};
`;
const Description = styled.div`
  font-size: 16px;
  opacity: 0.7;
  margin-top: 10px;
  padding-left: 15px;
  color: ${({ theme }) => theme.colors.text.default};
`;
const Deadline = styled.div`
  font-size: 14px;
  opacity: 0.7;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text.default};
`;
const Proposal = () => {
  // const theme = useTheme();

  const proposal1 = useTypedSelector((state) => state.proposals.proposal1);
  return (
    <Wrapper>
      <FirstRow>
        <div>{proposal1.author}</div>
        <Active>{proposal1.state}</Active>
      </FirstRow>
      <Title>{proposal1.title}</Title>
      <Description>{proposal1.body}</Description>
      <Deadline>
        {Math.floor((proposal1.end - proposal1.created) / 86400)} days left
      </Deadline>
    </Wrapper>
  );
};

export { Proposal };
