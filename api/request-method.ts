export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export interface INews {
  hits: [
    {
      created_at: Date;
      title: string;
      url: string;
      author: string;
      points: number;
      story_text: string | null;
      comment_text: string | null;
      num_comments: number;
      story_id: string | null;
      story_title: string | null;
      story_url: string | null;
      parent_id: string | null;
      created_at_i: number;
      _tags: string[];
      objectID: string;
      _highlightResult: {
        title: {
          value: string;
          matchLevel: string;
          fullyHighlighted: boolean;
          matchedWords: string[];
        };
        url: {
          value: string;
          matchLevel: string;
          fullyHighlighted: boolean;
          matchedWords: string[];
        };
        author: {
          value: string;
          matchLevel: string;
          matchedWords: string[];
        };
      };
    },
  ];
}

export const BASE_URL = "https://api.coinpaprika.com/v1";
export const BASE_NEW_URL =
  "https://hn.algolia.com/api/v1/search_by_date?query=cryptocurrency&tags=story&numericFilters=points>20";

export const fetchCoins = async (): Promise<any> => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchCoin = async (id: string): Promise<any> => {
  return fetch(`${BASE_URL}/coins/${id}`).then((response) => response.json());
};

export const fetchCoinTickers = async (coinId: string): Promise<IPriceData> => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
};

export const fetchNews = async (): Promise<INews> => {
  return fetch(`${BASE_NEW_URL}`).then((response) => response.json());
};

export const tmpData = {
  hits: [
    {
      created_at: "2021-11-02T11:38:24.000Z",
      title: "Squid Game Cryptocurrency Scammers Make Off with $3.3M",
      url: "https://gizmodo.com/squid-game-cryptocurrency-scammers-make-off-with-2-1-m-1847972824",
      author: "dsr12",
      points: 30,
      story_text: null,
      comment_text: null,
      num_comments: 11,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1635853104,
      _tags: ["story", "author_dsr12", "story_29079743"],
      objectID: "29079743",
      _highlightResult: {
        title: {
          value: "Squid Game <em>Cryptocurrency</em> Scammers Make Off with $3.3M",
          matchLevel: "full",
          fullyHighlighted: false,
          matchedWords: ["cryptocurrency"],
        },
        url: {
          value: "https://gizmodo.com/squid-game-<em>cryptocurrency</em>-scammers-make-off-with-2-1-m-1847972824",
          matchLevel: "full",
          fullyHighlighted: false,
          matchedWords: ["cryptocurrency"],
        },
        author: {
          value: "dsr12",
          matchLevel: "none",
          matchedWords: [],
        },
      },
    },
  ],
};
