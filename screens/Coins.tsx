import { Dimensions, Text, ActivityIndicator } from "react-native";
import React from "react";
import { fetchCoins, ICoin } from "../api/request-method";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

export const CoinListSafeAreaView = styled.SafeAreaView`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CoinLists = styled.FlatList``;

export const Coin = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CoinBox = styled.TouchableOpacity`
  width: ${width / 3.6}px;
  height: ${width / 3.6}px;
  justify-content: center;
  align-items: center;
  margin: 4px;
  background-color: ${({ theme }) => theme.contentColor};
`;

export const CoinImg = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Coins = () => {
  // const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const isLoading = false;
  const data = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
  ];
  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <CoinListSafeAreaView>
          <CoinLists
            data={data?.slice(0, 2)} // data?.slice(0, 100)
            renderItem={({ item, index }: any) => {
              return (
                <CoinBox
                  key={index}
                  onPress={() =>
                    navigation.navigate("Stacks", {
                      screen: "CoinDetail",
                      params: {
                        coinId: item.id,
                      },
                    })
                  }>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${item.id}/logo.png` }} />
                  <Text style={{ color: "white" }}>{item.symbol.toLowerCase()}</Text>
                </CoinBox>
              );
            }}
            keyExtractor={(item: any) => item.id}
            numColumns={3}
            columnWrapperStyle={{ flexWrap: "wrap" }}
            contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
          />
        </CoinListSafeAreaView>
      )}
    </Container>
  );
};

export default Coins;
