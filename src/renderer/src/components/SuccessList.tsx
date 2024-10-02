import { ListEventPlaceBetSuccess } from '@renderer/components/ListEventPlaceBetSuccess'
// import { Checkbox } from '@renderer/components/ui/checkbox'

export const SuccessList = () => {
  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex items-center justify-end mr-1 mb-1">
        <Checkbox className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900 mr-2" />
        <p>Clear when {'>'} 100 Bets</p>
      </div> */}
      <ListEventPlaceBetSuccess />
    </div>
  )
}
