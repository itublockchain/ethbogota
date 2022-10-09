/* eslint-disable */
import { OnRpcRequestHandler } from '@metamask/snap-types';

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

export const formatAddress = (address: string) => {
  return (
    address?.substring?.(0, 5) +
    '...' +
    address?.substring?.(address?.length - 5)
  );
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  let spaceId, spaceName, proposal, type, choice, choices, app, address;

  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });
    case 'sendVote':
      ({ spaceId, spaceName, proposal, type, choice, choices, app, address } =
        request as any);

      const confirmVote = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(formatAddress(address)),
            description: `Do you want to vote to ${spaceName} with ${choices[choice]}?`,
          },
        ],
      });
      if (!confirmVote) {
        return false;
      } else {
        return true;
      }
    default:
      throw new Error('Method not found.');
  }
};
