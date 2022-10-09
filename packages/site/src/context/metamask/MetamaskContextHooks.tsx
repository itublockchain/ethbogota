import { useCallback } from 'react';
import { Snap } from 'types';
import { MetamaskActions, useMetamaskContext } from './MetamaskContext';

export const useSetInstalled = () => {
  const [, dispatch] = useMetamaskContext();
  return useCallback(
    (installedSnap: Snap | undefined) =>
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      }),
    [],
  );
};

export const useSetError = () => {
  const [, dispatch] = useMetamaskContext();
  return useCallback(
    (e: any) => dispatch({ type: MetamaskActions.SetError, payload: e }),
    [],
  );
};

export const useSetAddress = () => {
  const [, dispatch] = useMetamaskContext();
  return useCallback(
    (e: string | undefined) =>
      dispatch({ type: MetamaskActions.SetAddress, payload: e }),
    [],
  );
};

export const useIsConnected = () => {
  const [state] = useMetamaskContext();
  return state.address != null;
};

export const useAddress = () => {
  const [state] = useMetamaskContext();
  return state.address;
};
