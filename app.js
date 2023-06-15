const { request, gql } = require("graphql-request");
const url =
  "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v1-eth";

async function getHistoricalMarketIndicators(variables) {
  const query = gql`
    query TokenDayDatas(
      $tokenAddress: Bytes!
      $startDate: Int!
      $endDate: Int!
    ) {
      tokenDayDatas(
        where: { token: $tokenAddress, date_gte: $startDate, date_lt: $endDate }
      ) {
        id
        date
        dailyVolumeUSD
        dailyTxns
        totalLiquidityUSD
        priceUSD
      }
    }
  `;

  try {
    const response = await request(url, query, variables);
    if (response.tokenDayDatas.length > 0) {
      console.log(response.tokenDayDatas);
      return response.tokenDayDatas;
    }
    console.log("There are no data");
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw error;
  }
}


let startDate = 1681516800;
let endDate = 1681520400;
const hourInSecond = 3600;

let variables = {
  tokenAddress: "0x2225c9764fe39001c7cb1cbde25a3443d5caed7b",
  startDate,
  endDate,
};

getHistoricalMarketIndicators(variables);

setInterval(() => {
  startDate += hourInSecond;
  endDate += hourInSecond;
  variables = {
    tokenAddress: "0x2225c9764fe39001c7cb1cbde25a3443d5caed7b",
    startDate,
    endDate
  }
  getHistoricalMarketIndicators(variables);
}, 1000);
