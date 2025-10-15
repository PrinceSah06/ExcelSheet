  export  interface DataType {
    
    id:number
    title:string,
    place_of_origin:string
    ,artist_display:string
    ,inscriptions:string
    ,date_end:string
    ,date_start:string

 }
 export interface PaginationData{
  total:string,
  limit:string,
  offset:string,
  total_pages:string,
  current_page:string,
  next_url:string,
  
 }
 
 export interface APIResult {
  data: DataType[],
  pageInfo: PaginationData
}
