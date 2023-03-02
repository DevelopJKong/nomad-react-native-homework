import { SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import { fetchCoins, ICoin, fetchCoinTickers, IPriceData } from "../api/request-method";
import { useQuery } from "react-query";
import { Container, CoinImg } from "./Coins";
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

const CoinLists = styled.ScrollView.attrs((_props) => {
  return {
    contentContainerStyle: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  };
})``;

const Prices = () => {
  const [allLoading, setAllLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [coinData, setCoinData] = useState<ICoin[]>([]);
  const { isLoading } = useQuery<ICoin[]>("coins", fetchCoins, {
    onSuccess: (data) => {
      setCoinData(data?.slice(0, 10));
      new Promise(function (resolve, reject) {
        data?.slice(0, 10).map((coin) => {
          fetchCoinTickers(coin?.id).then((res) => {
            resolve(setPriceData((prev) => [...prev, res]));
          });
        });
      });

      setAllLoading(false);
    },
  });
  return (
    <Container>
      {isLoading && allLoading ? (
        <Text style={{ color: "white" }}>Loading...</Text>
      ) : (
        <CoinLists>
          {coinData.map((coin, index) => (
            <Coin key={coin.id}>
              <CoinBox>
                <CoinName>
                  <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${coin.id}/logo.png` }} />
                  <Text style={{ color: "white" }}>{coin.symbol.toLowerCase()}</Text>
                </CoinName>
                <CoinPrice>
                  <Text style={{ color: "white" }}>{priceData[index].quotes.USD.price}</Text>
                </CoinPrice>
              </CoinBox>
            </Coin>
          ))}
        </CoinLists>
      )}
    </Container>
  );
};

export default Prices;
