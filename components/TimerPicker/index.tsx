import React, {useEffect, useState} from "react";

import {Container, BorderViewTop, BorderViewBottom} from "./styles";
import Picker from "./Picker";
import {CONTAINER_HEIGHT} from "./constants";


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
  const [hour, setHour] = useState((initialHourIndex+1).toString());
  const [minutes, setMinutes] = useState(initialMinutesIndex.toString());
  const [period, setPeriod] = useState("AM");

  useEffect(()=>{
    let time = "";
    if (period === "AM") {
      time = `${hour}:${minutes}`;
    } else {
      time = (`${Number(hour)+12}:${minutes}`).toString();
    }
    props.changeTimer(time);
  }, [hour, minutes, period]);

  const changedHour = (hour:string) =>{
    setHour(hour);
  };

  const changedMinute = (minute:string) =>{
    if (minute == "0") {
      minute = "00";
    }
    setMinutes(minute);
  };

  const changedPeriod = (period:string) =>{
    setPeriod(period);
  };

  return (
    <Container height={CONTAINER_HEIGHT} {...props}>
      <Picker items={hoursItems} onValueChange={changedHour} speed={500} initialIndex={initialHourIndex}/>
      <Picker items={minutesItems} onValueChange={changedMinute} speed={500} initialIndex={initialMinutesIndex}/>
      <Picker items={periodsItems} onValueChange={changedPeriod} speed={500}/>
      <BorderViewTop/>
      <BorderViewBottom/>
    </Container>
  );
}

export default TimerPicker;
