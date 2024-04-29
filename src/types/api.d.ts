

type limitedDataFetchResp<d> = {
  statusCode: number,
  message: string,
  results: {
    [key: string]: d[],
    page: number;
    pages: number;
    total: nmber
  }
}