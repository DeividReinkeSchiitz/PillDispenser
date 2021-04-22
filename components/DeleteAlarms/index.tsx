import React from "react";

import {Container, DeleteButton, DeleteText, TrashIcon} from "./styles";
import useTranslateY from "../../Animations/useTranslateY";
import {useAnimatedStyle, withTiming, interpolate} from "react-native-reanimated";
interface PropsI {
  deleteListOfAlarms:()=>void
}


const DeleteAlarms = (props:PropsI) => {
  const Y = useTranslateY();

  const translateYAnimation = useAnimatedStyle(()=>({
    transform: [{translateY: interpolate(Y.value, [-80, 0], [0, 80])}],
  }));

  return (
    <Container style={[translateYAnimation]} >
      <DeleteButton onPress={props.deleteListOfAlarms}>
        <TrashIcon/>
        <DeleteText>
             Deletar
        </DeleteText>
      </DeleteButton>
    </Container>
  );
};

export default DeleteAlarms;
