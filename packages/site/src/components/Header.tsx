import styled from 'styled-components';
import { useConnect } from 'hooks/useConnect';
import { useMetamaskContext } from 'context';
import { useDispatch } from 'react-redux';
import { setPage } from 'store/slicers/page';
import { getThemePreference } from 'utils';
import { useTheme } from 'hooks';
import LOGO from 'assets/metablast.png';
import { useIsConnected } from 'context/metamask/MetamaskContextHooks';
import { ConnectedButton, HeaderButtons } from './Buttons';
import { Toggle } from './Toggle';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.default};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoDiv = styled.img`
  display: flex;
  justify-content: center;
  width: 140px;
`;

const LinksDiv = styled.div`
  display: flex;
`;

const Link = styled.div`
  display: flex;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.text.alternative};
  }
`;

export const Header = () => {
  const [state] = useMetamaskContext();
  const { connect } = useConnect();
  const dispatch = useDispatch();
  const { toggleTheme } = useTheme();
  const isConnected = useIsConnected();

  return (
    <HeaderWrapper>
      <LogoDiv src={LOGO} />
      <LinksDiv>
        <Link onClick={() => dispatch(setPage('snapshot'))}>Snapshot</Link>
        <Link
          onClick={() => dispatch(setPage('bridge'))}
          style={{ marginLeft: '2rem' }}
        >
          Bridge
        </Link>
      </LinksDiv>
      <RightContainer>
        <Toggle onToggle={toggleTheme} defaultChecked={getThemePreference()} />
        {isConnected ? (
          <ConnectedButton />
        ) : (
          <HeaderButtons state={state} onConnectClick={connect} />
        )}
      </RightContainer>
    </HeaderWrapper>
  );
};
