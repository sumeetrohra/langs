import React, { useEffect, useState } from "react";
import { Box, Heading, useTheme } from "native-base";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getDictionary } from "../../api/dictionary";
import { IDictionary } from "../../types/dictionary";
import { LogBox } from "react-native";
import Spinner from "../../components/feedback/Spinner";
import useQuestions from "../../api/questions";
import Question from "./components/Question";
import { IQuestion } from "../../types/questions";
import { getRandomOptions } from "../../utils/options";

LogBox.ignoreLogs(["Setting a timer"]);

const Questions: React.FC = () => {
  const { loadingQuestions, questionsCollection } = useQuestions();
  const [dictionary, setDictionary] = useState<IDictionary>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<
    IQuestion | undefined
  >();

  const selectQuestion = (index: number): void => {
    if (questionsCollection && index >= questionsCollection?.length) {
      // This is where questions ends
      return;
    }
    if (questionsCollection && dictionary) {
      const question = questionsCollection[index];
      const correctAnswer = dictionary[question.answerId];
      const answerOptions = getRandomOptions(dictionary, question.answerId);
      setSelectedQuestion({
        ...questionsCollection[index],
        correctAnswer,
        answerOptions,
      });
    }
  };

  useEffect(() => {
    selectQuestion(0);
  }, [loadingQuestions, questionsCollection, dictionary]);

  useEffect(() => {
    setLoading(true);
    getDictionary().then((data) => {
      setDictionary(data);
      setLoading(false);
    });
  }, []);

  const theme = useTheme();

  const handleNextQuestion = () => {
    if (selectedQuestion && questionsCollection) {
      const index = questionsCollection.findIndex(
        (question) => question.english === selectedQuestion.english
      );
      selectQuestion(index + 1);
    }
  };

  return (
    <Box
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.primary[300],
        justifyContent: loading || loadingQuestions ? "center" : "flex-end",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spinner text="Loading dictionary" />
      ) : loadingQuestions ? (
        <Spinner text="Loading question" />
      ) : (
        dictionary &&
        questionsCollection &&
        selectedQuestion && (
          <Question
            dictionary={dictionary}
            currentQuestion={selectedQuestion}
            handleContinue={handleNextQuestion}
          />
        )
      )}
      <StatusBar style="auto" backgroundColor={theme.colors.primary[300]} />
    </Box>
  );
};

export default Questions;
