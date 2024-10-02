import PlusCircle from '@renderer/icons/plus-circle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import ChevronDown from '@renderer/icons/chevron-down'
import Xmark from '@renderer/icons/x-mark'
import { AccountPlatform } from '@renderer/components/AccountPlatform'
import { DataPlatformType } from '@shared/types'

interface DetailSportsBookProps {
  platform: DataPlatformType
}

export const DetailSportsBook: React.FC<DetailSportsBookProps> = ({ platform }) => {
  const handleAddAccount = (platform: DataPlatformType) => {
    window.electron.ipcRenderer.send('AddAccountPlatForm', {
      platformName: platform.name,
      idPlatform: platform.id,
      loginURL: platform.url
    })
  }

  const removePlatform = (idPlatform: number) => {
    window.electron.ipcRenderer.send('RemovePlatform', idPlatform)
  }

  const accountList = (platform: DataPlatformType) => {
    window.electron.ipcRenderer.send('ShowAccountList', platform)
  }

  return (
    <div className="mb-4">
      <div className="flex font-bold text-lg bg-white px-4 rounded-t-md items-center">
        <div className="flex-1 flex">
          <p className="w-[239px] pr-14">{platform.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer hover:bg-gray-300 px-4 border-x ">
              <div className="flex items-center">
                <p className="text-blue-700 text-base ">Menu</p>
                <ChevronDown className="pl-1 size-2.5 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none ">
              {/* <DropdownMenuItem className="text-blue-700 font-bold focus:text-blue-700 cursor-pointer">
                Login All
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500  font-bold focus:text-red-500 cursor-pointer">
                Logout All
              </DropdownMenuItem> 
              <DropdownMenuSeparator />*/}
              <DropdownMenuItem
                className=" font-bold cursor-pointer"
                onClick={() => accountList(platform)}
              >
                Account List
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
             <DropdownMenuItem className="font-bold cursor-pointer">
                Quick Proxy Setting
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold cursor-pointer">
                Select IP Address
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold cursor-pointer">
                Select IP Address Information
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div onClick={() => removePlatform(platform.id)}>
          <Xmark className="text-red-500 font-bold  cursor-pointer hover:text-red-400" />
        </div>
      </div>
      <div className="border-solid border-[1px] border-zinc-500 py-1">
        {platform.accounts &&
          platform.accounts.length > 0 &&
          platform.accounts.map((account, index) => (
            <AccountPlatform key={account.id} account={account} index={index} />
          ))}

        <div onClick={() => handleAddAccount(platform)} className="w-8">
          <PlusCircle className="text-green-500 size-8 cursor-pointer hover:text-green-600 " />
        </div>
      </div>
    </div>
  )
}
