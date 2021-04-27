import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {CheckBox} from "react-native";
import RightArrow from "../../assets/icons/RightArrow.svg";
import Animated from "react-native-reanimated";

export const Container = styled.View`
  flex:1;
  margin-left:30px;
  margin-right:30px;
`;

interface InputProps {
  inputError:boolean;
}
export const Input = styled.TextInput`
  margin-top:20px;

  height:60px;
  margin-bottom:30px;
  padding-left:20px;

  border:1.3px solid black;
  border-color:${(props:InputProps)=>props.inputError?Colors.error:"black"};
  border-radius:15px;

  font-size:20px;
  font-family:${Fonts.text};

  color: rgba(0,0,0,0.7);
`;

export const Label = styled.Text`
  font-size:20px;
  margin-top:30px;
  margin-bottom:10px;
  color:black;
  font-family:${Fonts.subtitle};
`;

interface SubTitleProps {
  height:number;
}

export const SubLabel = styled.Text`
  font-family:${Fonts.text};
  font-size:18px;
  margin-left:30px;
  min-height:${(props:SubTitleProps)=>props.height}px;
`;

export const RepeatedContainer = styled.View`
  flex:1;
  max-height:${(props:SubTitleProps)=>props.height}px;
  position:relative;
`;

export const WeekContainer = styled.TouchableOpacity`
  flex:1;
  flex-direction:row;
  justify-content:space-between;
  margin-left:80px;
`;

export const WeekDay = styled.Text`
  font-family:${Fonts.text};
  font-size:15px;
`;

export const Check = styled(CheckBox)`
`;

export const DefaultButton = styled.TouchableWithoutFeedback`
`;

export const Arrow = styled(RightArrow)`
  width:20px;
  height:20px;
`;

export const BackgroundMask = styled(Animated.View)`
  flex:1;
  background-color:${Colors.primary};
  height:${(props:SubTitleProps)=>props.height}px;
`;
