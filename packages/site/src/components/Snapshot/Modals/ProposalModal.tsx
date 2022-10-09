import { Modal } from 'ui/Modal/Modal';
import { ModalController } from 'hooks/useModal';
import styled from 'styled-components';
import { useTypedSelector } from 'store';
import { formatAddress } from 'utils/formatAddress';
import { sendVote } from 'utils';
import snapshot from '@snapshot-labs/snapshot.js';
import { PRODUCTIONSNAPSHOT } from 'constant/URLs';
import { Web3Provider } from '@ethersproject/providers';
import { useAddress } from 'context/metamask/MetamaskContextHooks';

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

const web3 = new Web3Provider(window.ethereum as any);
const client = new snapshot.Client712(PRODUCTIONSNAPSHOT);

console.log(web3);
console.log(client);

const ProposalModal = ({ modal }: { modal: ModalController }) => {
  const proposal = useTypedSelector((state) => state.proposals.proposal1);
  const address = useAddress();

  if (Array.isArray(proposal)) {
    return null;
  }

  const vote = async (choiceIndex: number) => {
    console.log(choiceIndex);
    const payload = {
      address,
      spaceId: proposal.space.id,
      spaceName: proposal.space.name,
      choices: proposal.choices,
      proposal: proposal.id,
      type: 'single-choice',
      choice: choiceIndex,
      reason: 'test',
      app: 'eth-bogoto-itublockchain',
    };

    try {
      const isConfirmed = await sendVote(payload);
      const [account] = await web3.listAccounts();

      if (isConfirmed) {
        try {
          const receipt = await client.vote(web3, account, {
            space: payload.spaceId,
            proposal: payload.proposal,
            type: payload.type as any,
            choice: payload.choice,
            reason: payload.reason,
            app: payload.app,
          });
          // eslint-disable-next-line
          alert('Voted successfully');
          console.log(receipt);
        } catch (err) {
          console.log(err);
        }
      }

      console.log();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={modal.isOpen} close={modal.close}>
      <Title>{proposal.title}</Title>
      <FirstRow>
        <Active>{proposal.state}</Active>
        <div>
          {proposal.space?.name} by {formatAddress(proposal.author)}
        </div>
      </FirstRow>
      <Description>{proposal.body}</Description>
      <YourVote>Cast your vote</YourVote>
      <Votes>
        {proposal.choices?.map((data: string, i: number) => {
          return (
            <VoteButton onClick={() => vote(i)} key={i}>
              {data}
            </VoteButton>
          );
        })}
      </Votes>
    </Modal>
  );
};

export { ProposalModal };
