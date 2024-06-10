import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Button, Spinner, Grid, HStack } from '@chakra-ui/react';
import axios from 'axios';

const GroupingList = () => {
  const [answers, setAnswers] = useState<{ answer: string; group: string }[]>([]);
  const [questionText, setQuestionText] = useState("Loading question...");
  const [questionId, setQuestionId] = useState(13);
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

  return (
    <Box textAlign="center" width="100%" height="100%" overflow="auto">
      <Text fontSize="lg" fontWeight="bold">First Group</Text>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={4} align="start">
          <Box bg="gray.100" p="4" borderRadius="md">
            <Text>{questionText}</Text>
            <Text>5 Points</Text>
          </Box>
          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4} overflow="auto">
            {answers.map((answer, index) => (
              <Box key={index} bg="gray.200" p="4" borderRadius="md">
                <Text>{answer.answer}</Text>
                <Text>{answer.group}</Text>
              </Box>
            ))}
          </Grid>
          <HStack spacing={2} justify="center">
            <Button onClick={handlePrevClick} colorScheme="blue">Previous</Button>
            <Button onClick={handleNextClick} colorScheme="blue">Next</Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}

export default GroupingList;
