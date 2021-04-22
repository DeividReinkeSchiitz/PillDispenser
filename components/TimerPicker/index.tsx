import React, {useContext, useEffect, useRef, useState} from "react";

import {Container, BorderViewTop, BorderViewBottom} from "./styles";
import Picker from "./Picker";
import {CONTAINER_HEIGHT} from "./constants";
import ContextSubmited from "../../context/ContextSubmited";

import useStateWithPromise from "../../hooks/useStateWithPromise";

const hoursItems = [
  "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];
/*
const minutes = [
  "", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
]; */

const minutesItems = ["", 0, 10, 20, 30, 40, 50];

const periodsItems = ["", "AM", "PM"];

interface TimerPickerProps{
  changeTimer:(h:string)=>void
}
const initialMinutesIndex = 0;
const initialHourIndex = 4;

function TimerPicker(props:TimerPickerProps) {
  const hours = useRef((initialHourIndex+1).toString());
  const minutes = useRef(initialMinutesIndex.toString());
  const period = useRef("AM");

  const changedHour = (hour:string) =>{
    hours.current = hour;
  };

  const changedMinute = async (minute:string) =>{
    if (minute == "0") {
      minute = "00";
    }
    minutes.current = minute;
  };

  const changedPeriod = (newPeriod:string) =>{
    period.current = newPeriod;

    let time = "";
    if (newPeriod === "AM") {
      time = `${hours.current}:${minutes.current}`;
    } else {
      time = (`${Number(hours.current)+12}:${minutes.current}`).toString();
    }

    props.changeTimer(time);
  };

  /*   useEffect(()=>{
    let time = "";
    if (period === "AM") {
      time = `${hour}:${minutes}`;
    } else {
      time = (`${Number(hour)+12}:${minutes}`).toString();
    }

    props.changeTimer(time);
  }, [hour, minutes, period]); */

  return (
    <Container height={CONTAINER_HEIGHT} {...props}>
      <Picker items={hoursItems} onValueChange={changedHour} speed={300} initialIndex={initialHourIndex}/>
      <Picker items={minutesItems} onValueChange={changedMinute} speed={300} initialIndex={initialMinutesIndex}/>
      <Picker items={periodsItems} onValueChange={changedPeriod} speed={300}/>
      <BorderViewTop/>
      <BorderViewBottom/>
    </Container>
  );
}

export default TimerPicker;
