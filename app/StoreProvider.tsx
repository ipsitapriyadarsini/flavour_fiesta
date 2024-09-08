'use client';

import { AppStore, makeStore } from '@/lib/store';
import { useRef, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
