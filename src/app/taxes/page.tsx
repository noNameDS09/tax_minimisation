import ChatBotSuggestion from '@/components/ChatBotSuggestion'
import TaxReport from '@/components/TaxReport'
import TransactionHistory from '@/components/TransactionHistory'

const page = () => {
  return (
    <div className='min-h-[30rem]'>
      <div className="">
        <TaxReport />
      </div>
      <div>
      <ChatBotSuggestion />
      </div>
    </div>
  )
}

export default page
