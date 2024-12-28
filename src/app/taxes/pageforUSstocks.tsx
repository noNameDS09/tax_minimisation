'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [stockValue, setStockValue] = useState("0");
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);
    try {
      const getPrice = async ()=>{
        const response = await axios.get('/api/users/getstockprice');
        setStockValue(response.data.stockData)
        setLoading(false);
      }
      getPrice()
    } catch (error:any) {
      console.log("Error while fetching stock price."), error.message;
      setStockValue("0");
      setLoading(false);
    }
  }, []);

  if(loading){
    return (
      <div className={`mt-40 text-center`}>
      Fetching stock detail, please wait...
    </div>
    )
  }
  return (
    <div className={`mt-40 text-center`}>
      {stockValue} USD
    </div>
  )
}

export default page;