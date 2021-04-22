import React, {useContext, useEffect, useRef, useState} from "react";

import {AlarmType} from "../../types";
import {Animated, Easing, View} from "react-native";
import {
  ButtonContainer,
  TimeText,
  RepetedText,
  NameText,
  Switch,
  NativeButton,
  Container,
  Check,
  SwtchContainer,
} from "./styles";
import api from "../../services/api";
import ContextUid from "../../context/ContextUserUid";
import ContextAllAlarmIsSelected from "../../context/ContextAllAlarmIsSelected";
import ContextIsDeleting from "../../context/ContextIsDeleting";
import useIsMount from "../../hooks/useIsMount";
import {Colors} from "react-native/Libraries/NewAppScreen";

interface PropsI extends AlarmType{
  setListOfAlarmsToDelete:(newId:string, selectAllIds?:boolean)=>void

}

function AlarmInfo(props: PropsI) {
  const uid = useContext(ContextUid);
  const {allAlarmIsSelected} = useContext(ContextAllAlarmIsSelected)!;
  const {isDeleting, changeIsDeleting} = useContext(ContextIsDeleting)!;

  const [switchState, setSwitchState] = useState(props.enabled);
  const [check, setCheck] = useState(false);

  const selectedToExclude = () => {
    changeIsDeleting(true);
    setCheck(true);
    props.setListOfAlarmsToDelete(props.id);
  };

  const changeChecked = (value?:boolean) =>{
    setCheck((check)=>value || !check);

    props.setListOfAlarmsToDelete(props.id);
  };

  const changeSwitchState = async () => {
    try {
      api.put(`/alarms/${props.id}`, {
        uid,
        enabled: !switchState,
      });
    } catch (error) {
      console.log(error);
    }
    setSwitchState((state)=>!state);
  };

  const selectButton = () =>{
    if (isDeleting) {
      changeChecked();
    };
  };

  useEffect(()=> {
    setCheck(true);
    props.setListOfAlarmsToDelete(props.id, true);
  }, [allAlarmIsSelected]);


  useEffect(()=>{
    if (isDeleting) return;
    setCheck(false);
    props.setListOfAlarmsToDelete(props.id, false);
  }, [isDeleting]);


  return (
    <Container >
      <NativeButton
        onLongPress={selectedToExclude}
        // eslint-disable-next-line new-cap
        background={NativeButton.Ripple("rbga(0,0,0,.3)", false)}
        onPress={selectButton}
      >
        <ButtonContainer>
          <>
            <View>
              <TimeText>
                {props.time}
              </TimeText>
              <RepetedText>
                {props.repeted}
              </RepetedText>
            </View>

            <View>
              <NameText>
                {props.name.length > 28 ? props.name.slice(0, 26).concat("..."):props.name}
              </NameText>

              {
                isDeleting?
                <Check
                  value={check}
                  onValueChange={changeChecked}
                  tintColors={{true: Colors.primary, false: Colors.grey}}
                /> :
                <SwtchContainer >
                  <Switch
                    isOn={switchState || false}
                    onColor="#2274A1"
                    offColor="rgba(0,0,0,0.15)"
                    size="large"
                    onToggle={changeSwitchState}
                  />
                </SwtchContainer>
              }
            </View>
          </>
        </ButtonContainer>
      </NativeButton>
    </Container>

  );
}

export default AlarmInfo;
