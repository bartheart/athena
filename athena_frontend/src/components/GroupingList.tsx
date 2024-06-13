import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Button, Spinner, HStack, Flex } from '@chakra-ui/react';
import axios from 'axios';

const GroupingList = () => {
  const [answers, setAnswers] = useState<{ answer: string; group: string }[]>([]);
  const [questionText, setQuestionText] = useState("Loading question...");
  const [questionId, setQuestionId] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/process_answers/${questionId}`);
        if (response.data && response.data.length > 0) {
          setAnswers(response.data);
          setQuestionText(response.data[0].question);
        } else {
          setQuestionText("No answers found for this question");
          setAnswers([]);
        }
      } catch (error) {
        setQuestionText("Failed to load question");
        setAnswers([]);
      }
      setLoading(false);
    };

    fetchAnswers();
  }, [questionId]);

  const handlePrevClick = () => {
    if (questionId > 1) {
      setQuestionId(prev => prev - 1);
    }
  };

  const handleNextClick = () => {
    setQuestionId(prev => prev + 1);
  };

  const groupAnswers = (answers: { answer: string; group: string }[]) => {
    return answers.reduce((groups: { [key: string]: { answer: string; group: string }[] }, answer) => {
      const { group } = answer;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(answer);
      return groups;
    }, {});
  };

  const groupedAnswers = groupAnswers(answers);

  return (
    <Box textAlign="center" width="100%" height="100vh" display="flex" flexDirection="column">
      <Text fontSize="lg" fontWeight="bold">First Group</Text>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={4} align="start" flex="1" overflow="hidden">
          <Box bg="gray.100" p="4" borderRadius="md" width="100%">
            <Text>{questionText}</Text>
            <Text>5 Points</Text>
          </Box>
          <Box flex="1" overflowY="auto" width="100%">
            {Object.keys(groupedAnswers).map((group) => (
              <Box key={group} mb={6} width="100%">
                <Text fontSize="lg" fontWeight="bold" mb={2}>{`Group ${group}`}</Text>
                <Flex wrap="wrap" gap={4}>
                  {groupedAnswers[group].map((answer, index) => (
                    <Box key={index} bg="gray.200" p="4" borderRadius="md" minWidth="200px" flex="1 1 200px">
                      <Text>{answer.answer}</Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Box>
        </VStack>
      )}
      <HStack spacing={2} justify="center" mt={4}>
        <Button onClick={handlePrevClick} colorScheme="blue">Previous</Button>
        <Button onClick={handleNextClick} colorScheme="blue">Next</Button>
      </HStack>
    </Box>
  );
}

export default GroupingList;
