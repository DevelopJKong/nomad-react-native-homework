import React, { useRef } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../theme";
import { Animated, Image, View, PanResponder } from "react-native";

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

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: ${({ theme }) => theme.color.pink};
  width: 260px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const CoinImg = styled.Image`
  width: 100px;
  height: 100px;
`;
const CoinName = styled.Text`
  margin-top: 20px;
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
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
  // ! Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  // !  Animations
  const onPressIn = Animated.spring(scale, { toValue: 0.95, useNativeDriver: true });
  const onPressOut = Animated.spring(scale, { toValue: 1, useNativeDriver: true });
  const goCenter = Animated.spring(position, { toValue: 0, useNativeDriver: true });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        console.log(dx);
        if (dx < -220) {
          Animated.spring(position, { toValue: -500, useNativeDriver: true }).start();
        } else if (dx > 220) {
          Animated.spring(position, { toValue: 500, useNativeDriver: true }).start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current;

  const onLike = () => {
    console.log("onLike");
  };

  const onDisLike = () => {
    console.log("onDislike");
  };
  return (
    <Container>
      <CardBox>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [{ scale }, { translateX: position }, { rotate: rotation }],
          }}>
          <CoinImg source={{ uri: "https://static.coinpaprika.com/coin/btc-bitcoin/logo.png" }} />
          <CoinName>Bitcoin</CoinName>
        </Card>
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
