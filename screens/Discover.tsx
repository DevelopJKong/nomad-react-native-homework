import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "../theme";
import { Animated, View, PanResponder, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { ICoin, fetchCoins } from "../api/request-method";

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
  position: relative;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: ${({ theme }) => theme.color.pink};
  width: 260px;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
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
  const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);
  // ! Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: ["-15deg", "0deg", "15deg"],
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });

  const opacity = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.3, 1],
    extrapolate: "clamp",
  });

  // ! State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex((prev) => prev + 1);
  };

  // !  Animations
  const onPressIn = Animated.spring(scale, { toValue: 0.95, useNativeDriver: true });
  const onPressOut = Animated.spring(scale, { toValue: 1, useNativeDriver: true });
  const goCenter = Animated.spring(position, { toValue: 0, useNativeDriver: true });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -220) {
          goLeft.start(onDismiss);
        } else if (dx > 220) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current;

  const onLike = () => {
    goLeft.start(onDismiss);
  };

  const onDisLike = () => {
    goRight.start(onDismiss);
  };
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          <CardBox>
            <Card
              style={{
                opacity,
                transform: [{ scale: secondScale }],
              }}>
              {data ? (
                <>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${data[index + 1].id}/logo.png` }} />
                  <CoinName>{data[index + 1].name}</CoinName>
                </>
              ) : (
                <>
                  <ActivityIndicator size='large' />
                </>
              )}
            </Card>
            <Card
              {...panResponder.panHandlers}
              style={{
                transform: [{ scale }, { translateX: position }, { rotate: rotation }],
              }}>
              {data ? (
                <>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${data[index].id}/logo.png` }} />
                  <CoinName>{data[index].name}</CoinName>
                </>
              ) : (
                <>
                  <ActivityIndicator size='large' />
                </>
              )}
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
        </>
      )}
    </Container>
  );
};

export default Discover;
