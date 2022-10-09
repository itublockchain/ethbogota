import {
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

  const connect = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();
      setInstalled(installedSnap);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  return { connect };
};
