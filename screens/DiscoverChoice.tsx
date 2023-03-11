import React from "react";
import styled from "styled-components/native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const ChoiceBtnWrapper = styled.View`
  width: 100%;
  height: 50%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const ChoiceBtn = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.color.pink};
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
`;

const ChoiceText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};
`;

const DiscoverChoice = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <Container>
      <ChoiceBtnWrapper>
        <ChoiceBtn onPress={() => navigation.navigate("Stacks", { screen: "Discover" })}>
          <ChoiceText>Card</ChoiceText>
        </ChoiceBtn>
        <ChoiceBtn onPress={() => navigation.navigate("Stacks", { screen: "DiscoverDrag" })}>
          <ChoiceText>Drag</ChoiceText>
        </ChoiceBtn>
      </ChoiceBtnWrapper>
    </Container>
  );
};

export default DiscoverChoice;
