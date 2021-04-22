import MaskedView from "@react-native-community/masked-view";
import React, {useContext, useEffect, useState} from "react";
import Animated, {useSharedValue, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";
import TimerPicker from "../../components/TimerPicker";
import Colors from "../../constants/Colors";

import {Container, Input, Label, Check, Arrow, SubLabel, WeekContainer, WeekDay, DefaultButton, RepeatedContainer} from "./styles";
import {Alert, View} from "react-native";
import ContextSubmited from "../../context/ContextSubmited";
import api from "../../services/api";
import ContextUid from "../../context/ContextUserUid";
import {useNavigation} from "@react-navigation/core";
import {ScrollView} from "react-native-gesture-handler";

const REPETED_OPTION_HEIGHT = 30;

interface WeekDaysProps {
  Seg:boolean;
  Ter:boolean;
  Quar:boolean;
  Quin:boolean;
  Sex:boolean;
  Sáb:boolean;
  Dom:boolean;
}

const weekDayDefault = {
  Seg: false,
  Ter: false,
  Quar: false,
  Quin: false,
  Sex: false,
  Sáb: false,
  Dom: false,
};


function AddAlarmScreen() {
  const uid = useContext(ContextUid);
  const {changeSubmited, submited} = useContext(ContextSubmited)!;

  const navigation = useNavigation();
  const [drugName, setDrugName] = useState("");
  const [customDays, setCustomDays] = useState<WeekDaysProps>(weekDayDefault);
  const [repeted, setRepeted] = useState("Diariamente");
  const [inputError, setInputError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);


  const Y = useSharedValue(0);
  const opacity = useSharedValue(0.3);

  const InputTextChanged = (name:string) =>{
    setDrugName(name);
  };


  const changeRepetedValue = (state:string)=>{
    setCustomDays(weekDayDefault);
    setIsDisabled(true);
    opacity.value = 0.3;

    switch (state) {
      case "Diariamente":
        Y.value = 0;

        break;

      case "Seg à Sex":
        Y.value = REPETED_OPTION_HEIGHT;

        break;

      case "Custom":
        Y.value = REPETED_OPTION_HEIGHT*2;
        opacity.value = 1;
        setIsDisabled(false);
        changeCustomDay("Seg");
        break;

      default:
        break;
    }
    setRepeted(state);
  };

  const changeCustomDay = (
      day:
        "Seg"|
        "Ter"|
        "Quar"|
        "Quin"|
        "Sex"|
        "Sáb"|
        "Dom",
  ) =>{
    setCustomDays({...customDays, [day]: !customDays[day]});
  };

  const opacityCustom = useAnimatedStyle(()=>({
    opacity: withTiming(opacity.value),
  }));

  const changeTimer = (h:string) => {
    console.log(h);
    if (drugName == "") {
      setInputError(true);
      return;
    }
    let currentRepeted:string = "";

    const entries = Object.entries(customDays);


    if (repeted != "Diariamente" && repeted != "Seg à Sex") {
      let count = 0;

      entries.map(([key, val])=>{
        if (val == true) {
          currentRepeted = currentRepeted + key + " | ";
          count ++;
        };
      });

      if (count == 7) {
        currentRepeted = "Diariamente";
      }
    } else {
      currentRepeted = repeted;
    }
    console.log("aaaaakiii: " + currentRepeted);

    const newAlarm = {
      name: drugName,
      time: h,
      repeted: currentRepeted,
      uid: uid,
    };

    try {
      const post = async () => {
        navigation.navigate("HomeScreen", {...newAlarm, stop: false});

        setInputError(false);
        changeSubmited(false);
        setDrugName("");
      };
      post();
    } catch (error) {
      Alert.alert(error.message, "Houve algum erro ao tentar conexão com o servidor.");
    }
  };

  const MaskedElement = () =>(
    <View
      style={{
        backgroundColor: "transparent",
      }}
    >
      <SubLabel onPress={()=>changeRepetedValue("Diariamente")} height={REPETED_OPTION_HEIGHT}>
Diariamente
      </SubLabel>
      <SubLabel onPress={()=>changeRepetedValue("Seg à Sex")} height={REPETED_OPTION_HEIGHT}>
Seg à Sex
      </SubLabel>
      <SubLabel onPress={()=>changeRepetedValue("Custom")} height={REPETED_OPTION_HEIGHT}>
Custom
      </SubLabel>
    </View>
  );

  return (
    <Container >
      <Input
        onChangeText={InputTextChanged}
        value={drugName}
        placeholder="Nome do remédio"
        underlineColorAndroid='rgba(0,0,0,0)'
        inputError={inputError}
      />
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="never">
        <TimerPicker changeTimer={changeTimer}/>
        <Label>
        Repetir
        </Label>

        <RepeatedContainer height={REPETED_OPTION_HEIGHT*3}>
          <MaskedView
            style={{height: REPETED_OPTION_HEIGHT*3}}
            maskElement={
              <MaskedElement/>
            }
          >
            <DefaultButton onPress={()=>changeRepetedValue("Diariamente")}>
              <View style={{flex: 1, backgroundColor: "black"}}/>
            </DefaultButton>
            <DefaultButton onPress={()=>changeRepetedValue("Seg à Sex")}>
              <View style={{flex: 1, backgroundColor: "black"}}/>
            </DefaultButton>
            <DefaultButton onPress={()=>changeRepetedValue("Custom")}>
              <View style={{flex: 1, backgroundColor: "black"}}/>
            </DefaultButton>

            <Animated.View
              style={[
                useAnimatedStyle(()=>({
                  transform: [{translateY: withSpring(Y.value+3)}],
                })),
                {width: "100%", zIndex: 1, height: REPETED_OPTION_HEIGHT, backgroundColor: Colors.primary, position: "absolute"}]}
            />
          </MaskedView>
          <Animated.View style={[{position: "absolute", zIndex: 1}, useAnimatedStyle(()=>({
            transform: [{translateY: withSpring(Y.value+3)}],
          }))]} >
            <Arrow/>
          </Animated.View>
        </RepeatedContainer>

        <Animated.View style={[opacityCustom, {flex: 1}]} >
          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Seg")}>
            <WeekDay>
        Segunda
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Seg")}>
              <Check
                disabled={isDisabled}
                value={customDays["Seg"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Ter")}>
            <WeekDay>
        Terça
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Ter")}>
              <Check
                disabled={isDisabled}
                value={customDays["Ter"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Quar")}>
            <WeekDay>
        Quarta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Quar")}>
              <Check
                disabled={isDisabled}
                value={customDays["Quar"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Quin")}>
            <WeekDay>
        Quinta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Quin")}>
              <Check
                disabled={isDisabled}
                tintColors={{true: Colors.primary, false: Colors.grey}}
                value={customDays["Quin"]}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Sex")}>
            <WeekDay>
        Sexta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Sex")}>
              <Check
                disabled={isDisabled}
                value={customDays["Sex"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Sáb")}>
            <WeekDay>
        Sábado
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Sáb")}>
              <Check
                disabled={isDisabled}
                value={customDays["Sáb"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Dom")}>
            <WeekDay>
        Domingo
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Dom")}>
              <Check
                disabled={isDisabled}
                value={customDays["Dom"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

export default AddAlarmScreen;
