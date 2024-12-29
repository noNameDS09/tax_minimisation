import TaxReport from '@/components/TaxReport'
import TransactionHistory from '@/components/TransactionHistory'

const page = () => {
  return (
    <div className='min-h-[30rem]'>
      <div className="">
        <TaxReport />
      </div>
      <div>
        <TransactionHistory />
      </div>
    </div>
  )
}

export default page
