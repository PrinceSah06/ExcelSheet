import type { APIResult, DataType, PaginationData } from "../types";

export default async function handleFetchData(url: string): Promise<APIResult> {
  const response = await fetch(url);

  const jsondata = await response.json();

  const info = Array.isArray(jsondata.data) ? jsondata.data : [];
  const {
    total,
    limit,
    offset,
    total_pages,
    current_page,
    next_url,
  }: PaginationData = jsondata.pagination;
  const pageInfo = {
    total,
    limit,
    offset,
    total_pages,
    current_page,
    next_url,
  };
  console.log(total, "page info");
  const data: DataType[] = info.map((item: any) => {
    const {
      id,
      title,
      place_of_origin,
      artist_display,
      inscriptions,
      date_start,
      date_end,
    } = item;
    return {
      id,
      title,
      place_of_origin,
      artist_display,
      inscriptions,
      date_start,
      date_end,
    };
  });

  const result: APIResult = {
    data: data,
    pageInfo: pageInfo,
  };
//   console.log(result);

  return result;
}
