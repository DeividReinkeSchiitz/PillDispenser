import styled from "styled-components/native";
import ToggleSwitch from "toggle-switch-react-native";
import Fonts from "../../constants/Fonts";
import {Animated, CheckBox} from "react-native";

export const NativeButton = styled.TouchableNativeFeedback`
`;

export const Container = styled.View`
   border-radius: 15px; 
   overflow: hidden;
   margin-top:10px;
   margin-bottom:10px;
`;

export const ButtonContainer = styled.View`
   position:relative;
   elevation:0.4;

   width:100%;
   height: auto;

   padding: 10px 16px;

   background-color:#fff;
   border-radius:15px; 
   flex-direction:row;
   justify-content:space-between;
`;


export const TimeText = styled.Text`
   font-size: 25px;
   font-family: ${Fonts.title};
   margin-top: 5px; 
`;
export const RepetedText = styled.Text`
   margin: 10px;
   font-size:13px;
`;

export const NameText = styled.Text`
   font-size:15px;
   margin-right: 12px;
   font-family:${Fonts.subtitle};
   color:black;
   text-transform:capitalize;
`;

export const SwtchContainer = styled(Animated.View)`
   position: absolute;

   bottom: 0px;
   right: 0px;
   margin-top: 8px;
`;

export const Switch = styled(ToggleSwitch)`

`;

export const Check = styled(CheckBox)`
   position: absolute;

   bottom: 0px;
   right: 0px;
   margin-top: 8px;
`;
