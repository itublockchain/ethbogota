/* eslint-disable */
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { PRODUCTIONSNAPSHOT } from '../../../constant/URLs';
import { Proposal } from './Proposal';
import { useEffect } from 'react';
import { PROPOSALIDS } from '../../../constant/ProposalIDs';
import { setProposals } from '../../../store/slicers/proposals';
const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.snapshot};
  min-width: 650px;
  border-radius: 14px;
  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  flex-direction: column;
  padding: 20px;
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
interface Modal {
  openIt: () => void;
}
const Proposals = ({ openIt }: Modal) => {
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
    dispatch(setProposals(response.data.data.proposal));
  };

  useEffect(() => {
    getProposal();
  });

  return (
    <Wrapper>
      <ProposalTitle>Proposals</ProposalTitle>
      <Proposal openIt={openIt} />
    </Wrapper>
  );
};

export { Proposals };
