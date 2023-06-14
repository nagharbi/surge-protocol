const { request, gql } = require("graphql-request");
const url =
  "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v1-cg-bsc";

async function getHistoricalMarketIndicators(token) {
  const query = gql`
    query{
        ticker(id: "${token}") {
        target_volume
        target_currency
        pool_id
        liquidity_in_usd
        last_price
        base_volume
        base_currency
        id
        }
    }
    `;
  const response = await request(url, query);
  console.log(response.ticker);
  return response.ticker;
}

getHistoricalMarketIndicators("0x9f19c8e321bD14345b797d43E01f0eED030F5Bff");

setInterval(() => {
  getHistoricalMarketIndicators("0x9f19c8e321bD14345b797d43E01f0eED030F5Bff");
}, 3600 * 1000);
