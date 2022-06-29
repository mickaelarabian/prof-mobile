import React from 'react';
import SocketContext from './SocketContext';
import {useSocketProvider} from '../hooks/useSocket';

const SocketProvider = React.memo(({children}) => {
  const data = useSocketProvider();
  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  );
});

export default SocketProvider;
