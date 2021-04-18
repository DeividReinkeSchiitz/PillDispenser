import React from "react";

import {Container, PlusIcon, NavigateButton} from "./styles";

interface PropsI {
   onPress: ()=> void;
}

const FloatButton = (props:PropsI) => {
  return (
    <Container >
      <NavigateButton onPress={props.onPress}>
        <PlusIcon/>
      </NavigateButton>
    </Container>
  );
};

export default FloatButton;
