import { Text } from "react-native";
import React, { useState } from "react";
import { fetchCoins, ICoin, fetchCoinTickers, IPriceData } from "../api/request-method";
import { useQuery } from "react-query";
import { Container, CoinLists, CoinImg } from "./Coins";
import styled from "styled-components/native";

const Coin = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CoinBox = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CoinName = styled.View``;

const CoinPrice = styled.View``;

const Prices = () => {
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins, {
    onSuccess: (data) => {
      data?.slice(0, 100).map((coin) => {
        fetchCoinTickers(coin?.id).then((res) => {
          setPriceData((prev) => [...prev, res]);
        });
      });
    },
  });
  return (
    <Container>
      {isLoading ? (
        <Text style={{ color: "white" }}>Loading...</Text>
      ) : (
        <CoinLists
          data={data}
          renderItem={({ coin, index }: any) => (
            <Coin>
              <CoinBox key={coin.id}>
                <CoinName>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${coin.id}/logo.png` }} />
                  <Text style={{ color: "white" }}>{coin.symbol.toLowerCase()}</Text>
                </CoinName>
                <CoinPrice>
                  <Text style={{ color: "white" }}>{priceData[index].quotes.USD.price}</Text>
                </CoinPrice>
              </CoinBox>
            </Coin>
          )}
        />
      )}
    </Container>
  );
};

export default Prices;
