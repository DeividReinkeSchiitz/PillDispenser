import styled from "styled-components/native";
import colors from "../../constants/Colors";
import fonts from "../../constants/Fonts";

import Pills from "../../assets/icons/Pills.svg";
import Close from "../../assets/icons/Wrong.svg";
import SelectAll from "../../assets/icons/SelectAll.svg";

import Animated from "react-native-reanimated";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

export const Container = styled(Animated.View)` 
  elevation:3;
  
  top:0;
  width:100%;
  height:145px;
  padding-top: 30px;
  padding-right:20px;

  background-color:${colors.primary};
  
  border-bottom-right-radius:15px;
  border-bottom-left-radius:15px;
  
  flex-direction:row;
  justify-content:space-between;
`;

export const Body = styled.View``;

export const Title = styled.Text`
    font-size:30px;
    margin-left:5px;
    color:${colors.title};
    font-family: ${fonts.title};
`;

export const Date = styled.Text`
  font-size:20px;
  margin-left:35px;

  color:${colors.title};
  font-family: ${fonts.text};
  text-transform:capitalize;
`;

export const PillIcon = styled(Pills)`
`;

export const IsNotDeletingContent = styled(Animated.View)`
  flex:1;
  flex-direction:row;
  justify-content:space-between;
`;

export const ButtonContent = styled.TouchableNativeFeedback`
  padding:5px;
`;

export const IsDeletingContent = styled(Animated.View)`
  padding-top:70px;
  padding-left:20px;
  padding-right:20px;

  flex:1;
  flex-direction:row;
  justify-content:space-between;
`;


export const CloseIcon = styled(Close)`
`;

export const ListIcon = styled(SelectAll)`
`;

export const DeleteText = styled.Text`
  font-size:20px;
  color:${Colors.title};
  font-family:${Fonts.subtitle};
`;

