import { Heading, HStack, Spinner } from "native-base";
import React from "react";

interface ICircularProgress {
  text: string;
}

const CircularProgress: React.FC<ICircularProgress> = (props) => {
  const { text } = props;
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel={text} color="black" />
      <Heading color="black" fontSize="md">
        {text}
      </Heading>
    </HStack>
  );
};

export default CircularProgress;
