import { Text } from "react-native";
import React from "react";
import { fetchCoins, ICoin } from "../api/request-method";
import { useQuery } from "react-query";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2d3436;
`;

export const CoinLists = styled.ScrollView.attrs(() => {
  return {
    contentContainerStyle: {
      justifyContent: "center",
      alignItems: "center",
    },
  };
})`
  width: 100%;
`;

export const Coin = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CoinBox = styled.View`
  width: 31%;
  height: 100px;
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
  console.log(data);
  return (
    <Container>
      {isLoading ? (
        <Text style={{ color: "white" }}>Loading...</Text>
      ) : (
        <CoinLists>
          <Coin>
            {data?.slice(0, 100).map((coin) => {
              return (
                <CoinBox key={coin.id}>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${coin.id}/logo.png` }} />
                  <Text style={{ color: "white" }}>{coin.symbol.toLowerCase()}</Text>
                </CoinBox>
              );
            })}
          </Coin>
        </CoinLists>
      )}
    </Container>
  );
};

export default Coins;
