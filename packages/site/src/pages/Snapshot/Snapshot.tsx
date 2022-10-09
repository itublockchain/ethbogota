import styled from 'styled-components';
import { useModal } from 'hooks';
import { Profile, ProposalModal, Proposals } from 'components';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.snapshot};

  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  padding-top: 24px;
  justify-content: center;
`;

const Dashboard = styled.div`
  width: 1000px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  justify-content: space-between;
  padding: 32px;

  ${({ theme }) => theme.mediaQueries.small} {
    width: 95%;
  }
`;

const SnapshotPage = () => {
  const proposalModal = useModal();

  return (
    <Wrapper>
      <Dashboard>
        <Profile />
        <Proposals openIt={proposalModal.open} />
      </Dashboard>
      <ProposalModal modal={proposalModal} />
    </Wrapper>
  );
};

export { SnapshotPage };
