/* eslint-disable */
// import styles from './Snapshot.module.scss';
import styled from 'styled-components';
import { Profile, Proposals } from '../../components';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.snapshot};
  color: red;
  display: flex;
  padding-top: 100px;
  justify-content: center;
`;

const Dashboard = styled.div`
  width: 1000px;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  color: red;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const SnapshotPage = () => {
  // const theme = useTheme();

  return (
    <Wrapper>
      <Dashboard>
        <Profile />
        <Proposals />
      </Dashboard>
    </Wrapper>
  );
};

export { SnapshotPage };
