import React, { useState } from 'react'
import { useGetMoviesQuery } from '../services/movieApi';

export default function MovieSection() {
  
  const [page, setPage] = useState<number>(1);

  const {data, isLoading, isError} = useGetMoviesQuery({page_number : 1, per_page : 24});

  const movies = data?.data ?? [];



  if(isLoading) return <p>Loading...</p> 
  
  if(isError) return <p>Error Loading movies</p>

  return (
    <div>MovieSection</div>


  )
}
