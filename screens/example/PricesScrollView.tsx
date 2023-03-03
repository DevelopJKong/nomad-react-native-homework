import { SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import { fetchCoins, ICoin, fetchCoinTickers, IPriceData } from "../../api/request-method";
import { useQuery } from "react-query";
import { Container, CoinImg } from "../Coins";
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

const CoinPrice = styled.View`
  justify-content: center;
  align-items: center;
`;

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
  const [isTickerLoading, setIsTickerLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [coinData, setCoinData] = useState<ICoin[]>([]);
  const { isLoading } = useQuery<ICoin[]>("coins", fetchCoins, {
    onSuccess: (data) => {
      setCoinData(data?.slice(0, 10));
      data?.slice(0, 10).map(async (coin) => {
        await fetchCoinTickers(coin?.id).then((res) => {
          setPriceData((prev) => [...prev, res]);
          setIsTickerLoading(false);
        });
      });
    },
  });
  return (
    <Container>
      {isLoading && isTickerLoading ? (
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
                  <Text style={{ color: "white" }}>
                    {priceData[index] ? `$${priceData[index].quotes.USD.price.toFixed(2)}` : "Loading..."}
                  </Text>
                  <Text style={{ color: `${priceData[index]?.quotes?.USD?.percent_change_12h > 0 ? "green" : "red"}` }}>
                    {priceData[index] ? `${priceData[index].quotes.USD.percent_change_12h}` : "Loading..."}
                  </Text>
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
