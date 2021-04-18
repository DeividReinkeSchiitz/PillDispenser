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
  Segunda:boolean;
  Terça:boolean;
  Quarta:boolean;
  Quinta:boolean;
  Sexta:boolean;
  Sábado:boolean;
  Domingo:boolean;
}

const weekDayDefault = {
  Segunda: false,
  Terça: false,
  Quarta: false,
  Quinta: false,
  Sexta: false,
  Sábado: false,
  Domingo: false,
};

function AddAlarmScreen() {
  const {submited} = useContext(ContextSubmited)!;
  const uid = useContext(ContextUid);

  const navigation = useNavigation();
  const [drugName, setDrugName] = useState("");
  const [customDays, setCustomDays] = useState<WeekDaysProps>(weekDayDefault);
  const [repeted, setRepeted] = useState("Diariamente");
  const [inputError, setInputError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputFocused, setInputFocused]= useState(false);

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
        changeCustomDay("Segunda");
        break;

      default:
        break;
    }

    setRepeted(state);
  };

  const changeCustomDay = (
      day:
        "Segunda"|
        "Terça"|
        "Quarta"|
        "Quinta"|
        "Sexta"|
        "Sábado"|
        "Domingo",
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

    if (repeted == "Custom") {
      Object.entries(customDays).map(([key, val])=>{
        if (val == true) {
          currentRepeted = currentRepeted + key + " | ";
        };
      });
    } else {
      currentRepeted = repeted;
    }

    const newAlarm = {
      "name": drugName,
      "time": h,
      "repeted": repeted,
      "uid": uid,
    };

    try {
      const post = async () => {
        await api.post("/alarms/create", newAlarm);
      };

      post();
      navigation.navigate("HomeScreen", {...newAlarm, enabled: true});

      setInputError(false);
      setDrugName("");
    } catch (error) {
      Alert.alert(error.message, "Houve algum erro ao tentar conexão com o servidor.");
    }
  };

  useEffect(()=>{
    setInputError(false);
  }, []);

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
          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Segunda")}>
            <WeekDay>
        Segunda
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Segunda")}>
              <Check
                disabled={isDisabled}
                value={customDays["Segunda"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Terça")}>
            <WeekDay>
        Terça
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Terça")}>
              <Check
                disabled={isDisabled}
                value={customDays["Terça"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Quarta")}>
            <WeekDay>
        Quarta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Quarta")}>
              <Check
                disabled={isDisabled}
                value={customDays["Quarta"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Quinta")}>
            <WeekDay>
        Quinta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Quinta")}>
              <Check
                disabled={isDisabled}
                tintColors={{true: Colors.primary, false: Colors.grey}}
                value={customDays["Quinta"]}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Sexta")}>
            <WeekDay>
        Sexta
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Sexta")}>
              <Check
                disabled={isDisabled}
                value={customDays["Sexta"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Sábado")}>
            <WeekDay>
        Sábado
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Sábado")}>
              <Check
                disabled={isDisabled}
                value={customDays["Sábado"]}
                tintColors={{true: Colors.primary, false: Colors.grey}}
              />
            </DefaultButton>
          </WeekContainer>

          <WeekContainer disabled={isDisabled} onPress={()=>changeCustomDay("Domingo")}>
            <WeekDay>
        Domingo
            </WeekDay>
            <DefaultButton disabled={isDisabled} onPress={()=>changeCustomDay("Domingo")}>
              <Check
                disabled={isDisabled}
                value={customDays["Domingo"]}
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
