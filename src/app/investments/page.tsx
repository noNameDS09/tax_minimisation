import ChatBot from '@/components/ChatBot';
import InvestInRealEstate from '@/components/InvestInRealEstate';
import InvestInStocks from '@/components/InvestInStock';
import InvestInVehicles from '@/components/InvestInVehicle';
import Portfolio from '@/components/Portfolio';
import SellRealEstate from '@/components/SellRealEstate';
import SellStock from '@/components/SellStock';
import SellVehicle from '@/components/SellVehicle';
import { Poppins, Roboto } from "next/font/google";

const roboto = Roboto({
  weight: '500',
  style: 'normal',
  subsets: ['latin']
});
const poppins = Poppins({
  weight: ['300', '400'],
  style: 'normal',
  subsets: ['latin']
});

const Invest = () => {
  return (
    <div className="flex flex-col sm:flex-col md:flex-col justify-center items-center bg-[#00ffff11] min-h-screen">
      <div className="w-[95%] sm:w-[70%] md:w-[40rem] mt-0">
        <ChatBot />
      </div>

      <div className="text-center w-[99%] mt-24 flex flex-col items-center">
        <div className={`${roboto.className} text-5xl tracking-wide text-green-700 mb-2`}>
          Invest In
        </div>
        <span className="relative inset-x-0 w-[12rem] mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center gap-x-12 w-full md:w-5/6">
          <div className="w-full md:w-[40rem] mb-10">
            <InvestInStocks />
          </div>
          <div className="w-full md:w-[40rem] mb-10">
            <InvestInVehicles />
          </div>
          <div className="w-full md:w-[40rem] mb-10">
            <InvestInRealEstate />
          </div>
        </div>
      </div>

      <div className="w-5/6 mb-6">
        <Portfolio />
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-0 mb-0">
        <div className="font-semibold relative text-black text-2xl dark:text-white px-4 py-2 rounded-full">
          <span className={`${poppins.className} text-4xl font-semibold text-center text-gray-800 mb-2 tracking-wide`}>
            Sell Your Assets
          </span>
          <span className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </div>

        <div className="pt-10 min-h-screen w-full text-center flex flex-wrap justify-center items-start gap-x-12 gap-y-2">
          <div className="w-full md:w-[30rem]">
            <SellStock />
          </div>
          <div className="w-full md:w-[30rem]">
            <SellVehicle />
          </div>
          <div className="w-full md:w-[30rem]">
            <SellRealEstate />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invest;
