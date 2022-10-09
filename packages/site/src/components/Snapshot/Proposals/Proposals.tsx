/* eslint-disable */
import styled from 'styled-components';
import LOGO from '../../../assets/itublockchain-logo.jpeg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { PRODUCTIONSNAPSHOT } from '../../../constant/URLs';
import { Proposal } from './Proposal';
import { useEffect } from 'react';
import { PROPOSALIDS } from '../../../constant/ProposalIDs';
import { setProposals } from '../../../store/slicers/proposals';
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
const ProposalTitle = styled.div`
  font-size: 24px;
  margin: 15px 0px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.default};
`;
const MemberCount = styled.div`
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.default};
`;

const Proposals = () => {
  // const theme = useTheme();
  const dispatch = useDispatch();

  const getProposal = async () => {
    const response = await axios({
      url: PRODUCTIONSNAPSHOT,
      method: 'post',

      data: {
        query: `query {
          proposal(id:"${PROPOSALIDS.proposal1}") {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            created
            scores
            scores_by_strategy
            scores_total
            scores_updated
            plugins
            network
            strategies {
              name
              network
              params
            }
            space {
              id
              name
            }
          }
        }`,
      },
    });
    console.log(response.data.data.proposal); // data
    dispatch(setProposals(response.data.data.proposal));
  };

  useEffect(() => {
    getProposal();
  });

  return (
    <Wrapper>
      <ProposalTitle>Proposals</ProposalTitle>
      <Proposal />
    </Wrapper>
  );
};

export { Proposals };
