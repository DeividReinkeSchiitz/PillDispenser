import React, {useContext, useState} from "react";


import {Container, CloseIcon, Title, AceptIcon, ButtonContent} from "./styles";
import {View} from "react-native";
import ContextSubmited from "../../context/ContextSubmited";

function HeaderAddAlarmStack({navigation}:any) {
  const {changeSubmited} = useContext(ContextSubmited)!;

  const closeAddAlarmScreen = () =>{
    changeSubmited(false);
    navigation.navigate("HomeScreen");
  };

  const addAlarm = () => {
    changeSubmited();
  };

  return (
    <Container>
      <ButtonContent onPress={closeAddAlarmScreen}
        background={ ButtonContent.Ripple("rgba(255,255,255,0.2)", true, 25)}
      >
        <View style={{padding: 20}}>
          <CloseIcon />
        </View>
      </ButtonContent>

      <Title>
            Adicionar alarme
      </Title>

      <ButtonContent onPress={addAlarm}
        background={ ButtonContent.Ripple("rgba(255,255,255,0.2)", true, 25)}
      >
        <View style={{padding: 10}}>
          <AceptIcon />
        </View>
      </ButtonContent>

    </Container>
  );
}

export default HeaderAddAlarmStack;
