import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { INews, fetchNews } from "../api/request-method";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, Button, Linking, TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

const NewsListSafeAreaView = styled.SafeAreaView``;

const NewsLists = styled.FlatList``;

const NewsBox = styled.View`
  height: 110px;
  background-color: ${({ theme }) => theme.contentColor};
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
`;

const NewsText = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
  margin-bottom: 5px;
`;

const NewsContent = styled.Text`
  color: ${({ theme }) => theme.textColor.gray};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
const NewsOptionContent = styled.View`
  margin-top: 15px;
  height: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const NewsOptionFirstBox = styled.View`
  flex-direction: row;
`;

const FirstText = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
  margin-right: 5px;
`;
const SecondText = styled.Text`
  color: ${({ theme }) => theme.textColor.white};
`;

const NewsOptionSecondBox = styled.View``;

const ReadText = styled.Text<{ isLink: boolean }>`
  color: ${({ theme, isLink }) => (isLink ? theme.textColor.white : theme.textColor.gray)};
`;

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";

type OpenURLButtonProps = {
  url: string;
  children: React.ReactNode;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

const News = () => {
  const [news, setNews] = useState<INews>({
    hits: [
      {
        created_at: new Date(),
        title: "",
        url: "",
        author: "",
        points: 0,
        story_text: "",
        comment_text: "",
        num_comments: 0,
        story_id: "",
        story_title: "",
        story_url: "",
        parent_id: "",
        created_at_i: 0,
        _tags: [""],
        objectID: "",
        _highlightResult: {
          title: {
            value: "",
            matchLevel: "",
            fullyHighlighted: false,
            matchedWords: [""],
          },
          url: {
            value: "",
            matchLevel: "",
            fullyHighlighted: false,
            matchedWords: [""],
          },
          author: {
            value: "",
            matchLevel: "",
            matchedWords: [""],
          },
        },
      },
    ],
  });
  const { isLoading } = useQuery<INews>("news", fetchNews, {
    onSuccess: (data) => {
      setNews(data);
    },
  });

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <NewsListSafeAreaView>
          <NewsLists
            data={news.hits}
            renderItem={({ item, index }: any) => {
              return (
                <NewsBox key={index}>
                  <NewsText>{item.title.length > 80 ? `${item.title.slice(0, 80)}...` : item.title}</NewsText>
                  <NewsContent>
                    {item?.story_text
                      ? item?.story_text?.length > 50
                        ? `${item.story_text.slice(0, 50)}...`
                        : item.story_text
                      : "NO CONTENT"}
                  </NewsContent>
                  <NewsOptionContent>
                    <NewsOptionFirstBox>
                      <FirstText>👍 {item.points}</FirstText>
                      <SecondText>💬 {item.num_comments}</SecondText>
                    </NewsOptionFirstBox>
                    <NewsOptionSecondBox>
                      {item.url ? (
                        <OpenURLButton url={item.url}>
                          <ReadText isLink={true}>Read More &rarr;</ReadText>
                        </OpenURLButton>
                      ) : (
                        <ReadText isLink={false}>No Link 😂</ReadText>
                      )}
                    </NewsOptionSecondBox>
                  </NewsOptionContent>
                </NewsBox>
              );
            }}
          />
        </NewsListSafeAreaView>
      )}
    </Container>
  );
};

export default News;
