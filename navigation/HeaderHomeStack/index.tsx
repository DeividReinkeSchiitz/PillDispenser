import moment from "moment";
import React, {useContext, useEffect, useRef, useState} from "react";

import {Container,
  Body,
  Title,
  Date,
  PillIcon,
  IsNotDeletingContent,

  IsDeletingContent,
  CloseIcon,
  DeleteText,
  ListIcon,
  ButtonContent,
} from "./styles";
import ContextIsDeleting from "../../context/ContextIsDeleting";
import Animated, {Easing} from "react-native";
import useTranslateY from "../../Animations/useTranslateY";
import ContextAllAlarmIsSelected from "../../context/ContextAllAlarmIsSelected";
import {interpolate, useAnimatedStyle} from "react-native-reanimated";


export default function HeaderStack() {
  const Y = useTranslateY();

  const {isDeleting, changeIsDeleting} = useContext(ContextIsDeleting)!;
  const {changeAllAlarmsIsSelected} = useContext(ContextAllAlarmIsSelected)!;

  const [time, setTime] = useState("");

  useEffect(() => {
    const mom = moment();
    const hours = mom.format("LT");
    let week = mom.format("llll");
    week = week.slice(0, week.indexOf(",") + 2);
    setTime(week + hours);

    setInterval(() => {
      const mom = moment();
      const hours = mom.format("LT");
      let week = mom.format("llll");
      week = week.slice(0, week.indexOf(",") + 2);
      setTime(week + hours);
    }, 60000);
  }, []);

  const closeIsDeleting = () =>{
    changeIsDeleting();
    changeAllAlarmsIsSelected();
  };

  const selectAllAlarms =() =>{
    changeAllAlarmsIsSelected();
  };


  // hidden to show
  const opacityInterpolated1 = useAnimatedStyle(()=>({
    opacity: interpolate(Y.value, [-80, 0], [1, 0]),
  }));

  // show to hidden
  const opacityInterpolated2 = useAnimatedStyle(()=>({
    opacity: interpolate(Y.value, [-80, 0], [0, 1]),
  }));

  const translateYAnimation = useAnimatedStyle(()=>({
    transform: [{translateY: Y.value}],
  }));

  return (
    <Container style={[translateYAnimation]}>
      {
        !isDeleting?
        <IsNotDeletingContent
          style={[opacityInterpolated2]}
        >
          <Body>
            <Title > Alarmes </Title>
            <Date>{time}</Date>
          </Body>
          <PillIcon />
        </IsNotDeletingContent> :

        <IsDeletingContent
          style={[opacityInterpolated1]}
        >
          <ButtonContent
            onPress={closeIsDeleting}
            // eslint-disable-next-line new-cap
            background={ButtonContent.Ripple("rbga(0,0,0,.3)", true, 25)}
          >
            <CloseIcon/>
          </ButtonContent>
          <DeleteText>
            Deletar Alarmes
          </DeleteText>

          <ButtonContent
            onPress={selectAllAlarms}
            // eslint-disable-next-line new-cap
            background={ButtonContent.Ripple("rbga(0,0,0,.3)", true, 25)}
          >
            <ListIcon/>
          </ButtonContent>
        </IsDeletingContent>
      }
    </Container>
  );
}
