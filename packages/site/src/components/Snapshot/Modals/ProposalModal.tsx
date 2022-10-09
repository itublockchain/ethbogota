import { Modal } from 'ui/Modal/Modal';
import { ModalController } from 'hooks/useModal';
import styled from 'styled-components';
import { useTypedSelector } from 'store';
import { formatAddress } from 'utils/formatAddress';

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
  gap: 25px;
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
  margin-top: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};
`;
const Description = styled.div`
  font-size: 16px;
  opacity: 0.7;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.default};
`;
const YourVote = styled.div`
  font-size: 18px;
  margin-top: 45px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Votes = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const VoteButton = styled.button`
  width: 100%;
`;

const ProposalModal = ({ modal }: { modal: ModalController }) => {
  const proposal1 = useTypedSelector((state) => state.proposals.proposal1);

  if (Array.isArray(proposal1)) {
    return null;
  }

  return (
    <Modal isOpen={modal.isOpen} close={modal.close}>
      <Title>{proposal1.title}</Title>
      <FirstRow>
        <Active>{proposal1.state}</Active>
        <div>
          {proposal1.space?.name} by {formatAddress(proposal1.author)}
        </div>
      </FirstRow>
      <Description>{proposal1.body}</Description>
      <YourVote>Cast your vote</YourVote>
      <Votes>
        {proposal1.choices?.map((data: string, i: number) => {
          return <VoteButton key={i}>{data}</VoteButton>;
        })}
      </Votes>
    </Modal>
  );
};

export { ProposalModal };
