export const isConnected = connectionInfo => {
  const status = connectionInfo.type.toUpperCase();
  return {
    type: 'IS_CONNECTED',
    payload: status !== 'NONE'
  };
};