import { Text, Animated, View, PanResponder, Easing, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { theme } from "../theme";
import { ICoin, fetchCoins } from "../api/request-method";
import { useQuery } from "react-query";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const Edge = styled.View`
  margin: 40px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.contentColor};
  border-radius: 9999px;
`;

const Word = styled.Text<{ color: string }>`
  font-size: 38px;
  font-weight: 500;
  color: ${({ color }) => color};
`;

const Center = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.contentColor};
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
`;

const CoinImg = styled.Image`
  width: 100px;
  height: 100px;
`;

const CoinName = styled.Text`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: bold;
`;

const DiscoverDrag = () => {
  const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);
  // ! Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [1.5, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 1.5],
    extrapolate: "clamp",
  });

  // ! Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goHome = Animated.spring(position, {
    toValue: { x: 0, y: 0 },
    useNativeDriver: true,
  });

  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 100,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const onScaleAgain = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const onOpacityAgain = Animated.spring(opacity, {
    toValue: 1,
    useNativeDriver: true,
  });
  // ! Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            Animated.timing(position, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    }),
  ).current;

  // ! State
  const [index, setIndex] = useState(0);
  const nextIcon = () => {
    setIndex((prev) => prev + 1);
    Animated.parallel([onScaleAgain, onOpacityAgain]).start();
  };
  return (
    <Container>
      {isLoading ? (
        <>
          <ActivityIndicator size='large' />
        </>
      ) : (
        <>
          <Edge>
            <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
              <Word color={theme.color.green}>Buy</Word>
            </WordContainer>
          </Edge>
          <Center>
            <IconCard
              {...panResponder.panHandlers}
              style={{
                opacity,
                transform: [
                  ...position.getTranslateTransform(),
                  {
                    scale,
                  },
                ],
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
            </IconCard>
          </Center>
          <Edge>
            <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
              <Word color={theme.color.red}>Sell</Word>
            </WordContainer>
          </Edge>
        </>
      )}
    </Container>
  );
};

export default DiscoverDrag;
