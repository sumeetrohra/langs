import { Box, useTheme, Button } from "native-base";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { IDictionary, ITranslation } from "../../../types/dictionary";
import { languages } from "../../../types/languages";
import { IQuestion } from "../../../types/questions";
interface IQuestionPageProps {
  dictionary: IDictionary;
  currentQuestion: IQuestion;
  handleContinue: () => void;
}

// This can come from the app context where user selects the language to learn, right now setting it to german
const languageToLearn = languages.GERMAN;

const Question: React.FC<IQuestionPageProps> = (props) => {
  const { currentQuestion, handleContinue } = props;
  const theme = useTheme();
  const { answerOptions, correctAnswer } = currentQuestion;

  const [selectedAnswer, setSelectedAnswer] = useState<ITranslation | null>();

  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(false);
  const [isAnswered, setIsAnswered] = useState<boolean | null>(false);

  const getEnglishQuestionString = () =>
    currentQuestion.english.split(" ").map((str, index) => {
      if (str === correctAnswer?.english) {
        return (
          <Text
            key={index}
            style={{ fontWeight: "700", textDecorationLine: "underline" }}
          >
            {str}{" "}
          </Text>
        );
      }
      return `${str} `;
    });

  const getLanguageQuestionString = () =>
    currentQuestion[languageToLearn].split(" ").map((str, index) => {
      if (str === "<q>") {
        return selectedAnswer ? (
          <Button bg="white" borderRadius={10}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "black",
              }}
            >
              {selectedAnswer.german}{" "}
            </Text>
          </Button>
        ) : (
          <Text key={index} style={{ textDecorationLine: "underline" }}>
            __________
          </Text>
        );
      }
      return `${str} `;
    });

  const handleCheckAnswer = () => {
    if (!isAnswered) {
      if (selectedAnswer?.german === correctAnswer?.german) {
        setIsAnswered(true);
        setIsAnswerCorrect(true);
      } else {
        setIsAnswered(true);
        setIsAnswerCorrect(false);
      }
    } else {
      handleContinue();
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setIsAnswered(null);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "90%",
        backgroundColor: theme.colors.primary[900],
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <View
        style={{
          padding: 20,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.light[300], marginTop: 10 }}>
          Fill in the missing word
        </Text>
        {correctAnswer && (
          <Text
            style={{ color: theme.colors.white, marginTop: 30, fontSize: 24 }}
          >
            {getEnglishQuestionString()}
          </Text>
        )}

        {correctAnswer && (
          <Text
            style={{
              color: theme.colors.light[50],
              marginTop: 40,
              fontSize: 22,
            }}
          >
            {getLanguageQuestionString()}
          </Text>
        )}
        <Box
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: "100%",
          }}
        >
          {answerOptions?.map((option, index) => (
            <Box
              key={index}
              style={{
                margin: 10,
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 15,
              }}
            >
              <Button
                bg="white"
                borderRadius={10}
                onPress={() => setSelectedAnswer(option)}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    color: "black",
                  }}
                >
                  {option?.german}
                </Text>
              </Button>
            </Box>
          ))}
        </Box>
      </View>
      <View
        style={{
          backgroundColor:
            isAnswered && !isAnswerCorrect
              ? theme.colors.danger[500]
              : theme.colors.cyan[400],
          width: "100%",
          height: "20%",
          padding: 20,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isAnswered && (
          <Text style={{ color: theme.colors.white }}>
            {isAnswerCorrect ? "Great Job" : `Answer: ${correctAnswer?.german}`}
          </Text>
        )}
        <Button
          disabled={!selectedAnswer}
          bg={
            selectedAnswer
              ? theme.colors.primary[700]
              : theme.colors.primary[800]
          }
          size="lg"
          style={{
            width: "80%",
            height: "45%",
            borderRadius: 30,
          }}
          onPress={handleCheckAnswer}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: selectedAnswer ? "white" : "white",
              fontSize: 18,
            }}
          >
            {selectedAnswer && !isAnswered ? "Check Answer" : "Continue"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Question;
