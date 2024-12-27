import ChatBot from '@/components/ChatBot';
import InvestInRealEstate from '@/components/InvestInRealEstate'
import InvestInStocks from '@/components/InvestInStocks'
import InvestInVehicles from '@/components/InvestInVehicles'
import Portfolio from '@/components/Portfolio';
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: '500',
    style: 'normal',
    subsets: ['latin']
});

const Invest = () => {
  return (
    <div className="flex flex-col sm:flex-col md:flex-col justify-center items-center">
      <div className={`w-[95%] sm:w-[70%] md:w-[40rem]`}>
        <ChatBot />
      </div>
      <div className={`${roboto.className} text-5xl tracking-wide text-green-700 mt-24 -mb-10`}>
        Invest In 
      </div>
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center gap-x-4 w-full md:w-5/6">
        <div className="w-full">
          <InvestInStocks />
        </div>
        <div className="w-full">
          <InvestInVehicles />
        </div>
        <div className="w-full">
          <InvestInRealEstate />
        </div>
      </div>
      <div>
        <Portfolio />
      </div>
    </div>
  )
}

export default Invest;
