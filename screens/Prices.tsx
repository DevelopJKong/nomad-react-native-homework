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
  padding-left: 20px;
  padding-right: 20px;
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

const CoinListWrapper = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const CoinLists = styled.FlatList``;

const Prices = () => {
  const [isTickerLoading, setIsTickerLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<IPriceData[]>([]);
  const [coinData, setCoinData] = useState<ICoin[]>([]);
  const { isLoading, data } = useQuery<ICoin[]>("coins", fetchCoins, {
    onSuccess: (data) => {
      setCoinData(data?.slice(0, 20));
      data?.slice(0, 20).map(async (coin) => {
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
        <CoinListWrapper>
          <CoinLists
            data={data?.slice(0, 20)}
            renderItem={({ item, index }: any) => (
              <Coin key={item.id}>
                <CoinBox>
                  <CoinName>
                    {coinData[index] ? (
                      <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${coinData[index].id}/logo.png` }} />
                    ) : (
                      <Text style={{ color: "white" }}>Loading...</Text>
                    )}
                    <Text style={{ color: "white" }}>{coinData[index]?.symbol?.toLowerCase()}</Text>
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
            )}
          />
        </CoinListWrapper>
      )}
    </Container>
  );
};

export default Prices;
