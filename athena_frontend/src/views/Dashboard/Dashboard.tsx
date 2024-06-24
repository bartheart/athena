import React from 'react';
import { Box} from '@chakra-ui/react';
import FileUpload from '@components/FileUpload';


function DashBoard() {
  return (
        <Box flex="1" p="5">
          <FileUpload fileName='Student'/>
        </Box>
     
  );
}

export default DashBoard;
