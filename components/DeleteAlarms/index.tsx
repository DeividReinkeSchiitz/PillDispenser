import React, {useContext, useEffect, useRef} from "react";
import {Animated, Easing} from "react-native";

import {Container, DeleteButton, DeleteText, TrashIcon} from "./styles";
import ContextIsDeleting from "../../context/ContextIsDeleting";
import useTranslateY from "../../Animations/useTranslateY";

interface PropsI {
  deleteListOfAlarms:()=>void
}


const DeleteAlarms = (props:PropsI) => {
  const translateY = useTranslateY();

  const translateInterpolated = translateY.interpolate({
    inputRange: [-80, 0],
    outputRange: [0, 80],
  });

  return (
    <Container style={{transform: [{translateY: translateInterpolated}]}}>
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
