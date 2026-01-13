export interface PaginationQuery  {
    page_number? : number;
    per_page? : number;
  
}

export interface PaginatedResponse<T> {
    data : T[];
    total : number;
    page_number : number;
    per_page : number;
}