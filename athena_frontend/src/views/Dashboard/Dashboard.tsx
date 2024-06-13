import React from 'react';
import { Box} from '@chakra-ui/react';
import GroupingList from '@components/GroupingList';
// import FileUpload from '@components/FileUpload';


function DashBoard() {
  return (
        <Box flex="1" p="5">
          {/* <FileUpload/> */}
          <GroupingList />
        </Box>
     
  );
}

export default DashBoard;
