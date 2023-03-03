import { Dimensions, SafeAreaView, Text } from "react-native";
import React from "react";
import { fetchCoins, ICoin } from "../api/request-method";
import { useQuery } from "react-query";
import styled from "styled-components/native";

interface ICoinType {
  id: string;
  symbol: string;
}

const { width } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2d3436;
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

export const CoinBox = styled.View`
  width: ${width / 3.6}px;
  height: ${width / 3.6}px;
  justify-content: center;
  align-items: center;
  margin: 4px;
  background-color: #343e3e;
`;

export const CoinImg = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins);
  // const isLoading = false;
  // const tmpData = [
  //   {
  //     id: "btc-bitcoin",
  //     symbol: "Bitcoin",
  //   },
  //   {
  //     id: "btc-bitcoin",
  //     symbol: "Bitcoin",
  //   },
  // ];
  return (
    <Container>
      {isLoading ? (
        <Text style={{ color: "white" }}>Loading...</Text>
      ) : (
        <CoinListSafeAreaView>
          <CoinLists
            data={data?.slice(0, 20)} // data?.slice(0, 100)
            renderItem={({ item, index }: any) => {
              return (
                <CoinBox key={index}>
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
