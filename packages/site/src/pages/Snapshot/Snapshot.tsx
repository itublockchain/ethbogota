/* eslint-disable */
// import styles from './Snapshot.module.scss';
import styled from 'styled-components';
import { Profile, ProposalModal, Proposals } from '../../components';
import { useModal } from '../../hooks/useModal';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.snapshot};

  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  padding-top: 100px;
  justify-content: center;
`;

const Dashboard = styled.div`
  width: 1000px;
  background-color: ${({ theme }) => theme.colors.background.alternative};

  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const SnapshotPage = () => {
  // const theme = useTheme();
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
