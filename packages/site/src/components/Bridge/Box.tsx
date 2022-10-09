import { useState } from 'react';
import styled from 'styled-components';
import Optimism from 'assets/optimism.png';
import Ethereum from 'assets/ethereum.png';
import { SubmitButton } from 'components/Buttons';
import { useConnect } from 'hooks';
import {
  useAddress,
  useIsConnected,
} from 'context/metamask/MetamaskContextHooks';
import { sendBridge } from 'utils';

const BoxDiv = styled.div`
  border: none;
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border-radius: 12px;
  width: 512px;
  margin-left: auto;
  margin-right: auto;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 2rem;
  min-height: 80vh;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.span`
  font-size: 18px;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 18px;
  border-radius: 12px;
  margin-top: 12px;
`;

const SelectOption = styled.option`
  padding: 12px;
  font-size: 24px;
`;

const AmountInput = styled.input`
  padding: 12px;
  font-size: 18px;
  border-radius: 12px;
  margin-top: 24px;
  border: none;
  outline: none;
`;

const FromTo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

const ChainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

type Token = {
  address: string;
  name: string;
};
const tokens: Token[] = [
  { address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', name: 'WETH' },
  { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', name: 'DAI' },
  { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', name: 'USDC' },
];

export function decimalToHex(d: string | number, padding: number) {
  let _padding = padding;
  let hex = Number(d).toString(16);
  _padding =
    typeof _padding === 'undefined' || _padding === null
      ? (_padding = 2)
      : _padding;

  while (hex.length < _padding) {
    hex = '0' + hex;
  }

  return hex;
}

export function padHex(hex: string, padding = 64) {
  let _hex = hex;
  let _padding = padding;
  _padding =
    typeof _padding === 'undefined' || _padding === null
      ? (_padding = 2)
      : _padding;

  while (_hex.length < _padding) {
    _hex = '0' + _hex;
  }

  return _hex;
}

export const Box = () => {
  const [token, setToken] = useState(tokens[0]);
  const isConnected = useIsConnected();
  const { connect } = useConnect();
  const address = useAddress();
  const [amount, setAmount] = useState('');
  const [receipient, setReceipient] = useState('');

  return (
    <Wrapper>
      <BoxDiv>
        <Label>Token</Label>
        <Select
          onChange={(e) => {
            const _token = JSON.parse(e.target.value);
            setToken(_token);
          }}
        >
          {tokens.map((item) => {
            return (
              <SelectOption value={JSON.stringify(item)}>
                {item.name}
              </SelectOption>
            );
          })}
        </Select>

        <FromTo>
          <ChainDiv>
            <img style={{ width: '32px', marginRight: '8px' }} src={Ethereum} />
            Ethereum
          </ChainDiv>
          <Label style={{ marginLeft: '12px', marginRight: '12px' }}>To</Label>
          <ChainDiv>
            <img style={{ width: '32px', marginRight: '8px' }} src={Optimism} />
            Optimism
          </ChainDiv>
        </FromTo>

        <AmountInput
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type={'number'}
          placeholder="Amount"
        />
        <AmountInput
          onChange={(e) => setReceipient(e.target.value)}
          value={receipient}
          type="text"
          placeholder="Receipient address"
        />
        <SubmitButton
          style={{ width: '100%', marginTop: '24px' }}
          onClick={async () => {
            if (isConnected) {
              if (receipient.trim() === '' || amount.trim() === '') {
                // eslint-disable-next-line
                alert('Fill the blanks');
                return;
              }
              const callData = await sendBridge({
                to: '0x4d9079bb4165aeb4084c526a32695dcfd2f77381',
                from: address,
                value: '0x00',
                tokenName: token.name,
                params: {
                  method: '0x49228978',
                  receipient,
                  token: token.address,
                  amount: Number(amount),
                  to: '000000000000000000000000000000000000000000000000000000000000000a',
                  relayerFee:
                    '000000000000000000000000000000000000000000000000016345785D8A0000',
                  timestamp: Math.floor(new Date().getTime() / 1000),
                },
              });
              if (callData === false) {
                // eslint-disable-next-line
                alert('Transaction rejected');
              } else {
                const transactionParameters = {
                  gas: '11170',
                  to: '0x4d9079bb4165aeb4084c526a32695dcfd2f77381',
                  from: address,
                  value: '0x00',
                  data: callData,
                };
                await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
                });
                // eslint-disable-next-line
                alert('Transaction sent!');
              }
            } else {
              connect();
            }
          }}
        >
          {isConnected ? 'Bridge' : 'Connect wallet'}
        </SubmitButton>
      </BoxDiv>
    </Wrapper>
  );
};
