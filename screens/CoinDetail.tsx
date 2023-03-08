import { ActivityIndicator, Share } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { fetchCoin, ICoinDetail } from "../api/request-method";
import { useQuery } from "react-query";
import OpenURLButton from "../components/OpenURLButton";
import { CoinImg } from "./Coins";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const CoinSafeAreaView = styled.SafeAreaView`
  padding-top: 30px;
`;
const CoinTitleBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CoinWrapper = styled.ScrollView`
  height: 100%;
  padding: 50px 20px 50px 20px;
`;

const CoinTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.large}
  color: ${({ theme }) => theme.textColor.white};
`;

const CoinDescription = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.medium}
  color: ${({ theme }) => theme.textColor.white};
`;

const LinksWrapper = styled.View`
  margin-top: 20px;
`;

const LinkTitle = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
`;

const LinkText = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
`;

const OpenUrlBtn = styled(OpenURLButton)`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.textColor.gray};
  justify-content: space-between;
  flex-direction: row;
`;

const ShareBtn = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
`;

const CoinDetail = ({ route: { params } }: any) => {
  const { coinId } = params;

  const { isLoading, data } = useQuery<ICoinDetail>("coinDetail", () => fetchCoin(coinId));

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data?.links?.website[0] ? data?.links?.website[0] : "Prepare to share",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("activityType!");
        } else {
          console.log("Share!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      let typedError = error as Error;
      alert(typedError.message);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <>
          <CoinSafeAreaView />
          <CoinWrapper>
            <CoinTitleBox>
              <CoinTitle>About {data?.name} </CoinTitle>
              <CoinImg source={{ uri: `https://static.coinpaprika.com/coin/${coinId}/logo.png` }} />
              <ShareBtn onPress={onShare}>
                <Ionicons name='share-social-outline' size={24} color='white' />
              </ShareBtn>
            </CoinTitleBox>
            <CoinDescription>{data?.description}</CoinDescription>
            <LinksWrapper>
              <LinkTitle>Links</LinkTitle>
              {data?.links?.explorer?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.explorer.length === 1 ? "- " : `${index + 1}.`} News</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
              {data?.links?.facebook?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.facebook.length === 1 ? "- " : `${index + 1}.`} Facebook Link</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
              {data?.links?.reddit?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.reddit.length === 1 ? "- " : `${index + 1}.`} Reddit Link</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
              {data?.links?.source_code?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.source_code.length === 1 ? "- " : `${index + 1}.`} Source Code Link</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
              {data?.links?.website?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.website.length === 1 ? "- " : `${index + 1}.`} Website Link</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
              {data?.links?.youtube?.map((item: string, index: number) => (
                <OpenUrlBtn key={index} url={item}>
                  <LinkText>{data?.links?.youtube.length === 1 ? "- " : `${index + 1}.`} Youtube Link</LinkText>
                  <FontAwesome name='pencil-square-o' size={12} color='white' />
                </OpenUrlBtn>
              ))}
            </LinksWrapper>
          </CoinWrapper>
        </>
      )}
    </Container>
  );
};

export default CoinDetail;
