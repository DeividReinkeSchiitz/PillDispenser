import {createContext} from "react";

interface ContextProps {
   allAlarmIsSelected:boolean;
   changeAllAlarmsIsSelected: (value?:boolean) => void;
}

const ContextAllAlarmIsSelected = createContext<ContextProps | null>(null);

export default ContextAllAlarmIsSelected;
