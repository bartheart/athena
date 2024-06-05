import React from 'react';
import { Box} from '@chakra-ui/react';
import GroupingList from '@components/GroupingList';

function DashBoard() {
  return (

        <Box flex="1" p="5" overflow="auto">
          <GroupingList />
        </Box>
     
  );
}

export default DashBoard;
