import {
  useSetAddress,
  useSetError,
  useSetInstalled,
} from 'context/metamask/MetamaskContextHooks';
import { connectSnap, getSnap } from 'utils';

interface AbstractUseConnectReturnType {
  connect: () => Promise<void>;
}

export const useConnect = (): AbstractUseConnectReturnType => {
  const setInstalled = useSetInstalled();
  const setError = useSetError();
  const setAddress = useSetAddress();

  const connect = async () => {
    try {
      await connectSnap(setAddress);

      const installedSnap = await getSnap();
      setInstalled(installedSnap);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  return { connect };
};
