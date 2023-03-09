import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../theme";
import { Animated, Image } from "react-native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const CardBox = styled.View`
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
`;

const Card = styled.View`
  background-color: ${({ theme }) => theme.color.pink};
  width: 280px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
const AnimatedCard = styled(Animated.createAnimatedComponent(Card))``;

const CoinImg = styled.Image`
  width: 100px;
  height: 100px;
`;
const CoinName = styled.Text`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

const CardBtnsBox = styled.View`
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BtnsWrapper = styled.View`
  width: 30%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const Btn = styled.TouchableOpacity`
  padding: 10px;
`;

const Discover = () => {
  const onLike = () => {
    console.log("onLike");
  };

  const onDisLike = () => {
    console.log("onDislike");
  };
  return (
    <Container>
      <CardBox>
        <AnimatedCard>
          <CoinImg source={{ uri: "https://static.coinpaprika.com/coin/btc-bitcoin/logo.png" }} />
          <CoinName>Bitcoin</CoinName>
        </AnimatedCard>
      </CardBox>
      <CardBtnsBox>
        <BtnsWrapper>
          <Btn onPress={onLike}>
            <FontAwesome5 name='heart-broken' size={40} color={theme.color.white} />
          </Btn>
          <Btn onPress={onDisLike}>
            <FontAwesome name='heart-o' size={40} color={theme.color.white} />
          </Btn>
        </BtnsWrapper>
      </CardBtnsBox>
    </Container>
  );
};

export default Discover;
