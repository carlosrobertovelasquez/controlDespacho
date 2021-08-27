import React from 'react';
import {NativeBaseProvider, Box, Center} from 'native-base';

const Login = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box>Control Despacho</Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default Login;
