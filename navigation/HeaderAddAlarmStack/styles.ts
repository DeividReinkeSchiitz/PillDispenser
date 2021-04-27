import styled from "styled-components/native";
import Colors from "../../constants/Colors";

import Wrong from "../../assets/icons/Wrong.svg";
import Correct from "../../assets/icons/Correct.svg";
import Fonts from "../../constants/Fonts";

export const Container = styled.View`
  padding-left:20px;
  padding-right:20px;

  flex-direction:row;
  justify-content:space-between;
  align-items:center;

  background-color:${Colors.primary};
  border-bottom-left-radius:15px;
  border-bottom-right-radius:15px;
`;

export const CloseIcon = styled(Wrong)`
`;

export const AceptIcon = styled(Correct)`
`;

export const Title = styled.Text`
    font-size:20px;
    color:${Colors.title};
    font-family: ${Fonts.subtitle};
`;


export const ButtonContent = styled.TouchableNativeFeedback``;
