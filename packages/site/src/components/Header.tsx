import styled from 'styled-components';
import { useConnect } from 'hooks/useConnect';
import { useMetamaskContext } from 'context';
import { getThemePreference } from '../utils';
import LOGO from '../assets/metablast.png';
import { HeaderButtons } from './Buttons';
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

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const [state] = useMetamaskContext();
  const { connect } = useConnect();

  return (
    <HeaderWrapper>
      <LogoDiv src={LOGO} />
      <RightContainer>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <HeaderButtons state={state} onConnectClick={connect} />
      </RightContainer>
    </HeaderWrapper>
  );
};
