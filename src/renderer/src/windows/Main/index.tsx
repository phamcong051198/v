import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { BetList } from '@renderer/components/BetList'
import { ContraList } from '@renderer/components/ContraList'
import { SportsBook } from '@renderer/components/SportsBook'
import { SuccessList } from '@renderer/components/SuccessList'

export default function Main() {
  const { t, i18n } = useTranslation('main')

  const handleGeneralSetting = () => {
    window.electron.ipcRenderer.send('showSettingWindow')
  }
  const handleGeneralAccountPair = () => {
    window.electron.ipcRenderer.send('showAccountPairWindow')
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex flex-col h-full">
      <Menubar className="rounded-none border-none shadow-none h-8 bg-[#ecebeb]">
        <MenubarMenu>
          <MenubarTrigger className="text-[#800080] font-bold data-[state=open]:text-[#800080] data-[state=open]:bg-[#fff] cursor-pointer">
            {t('ProgramSetting')}
          </MenubarTrigger>
          <MenubarContent className="border-none shadow-none">
            <MenubarItem className="font-bold cursor-pointer" onClick={handleGeneralSetting}>
              {t('GeneralSetting')}
            </MenubarItem>
            <MenubarItem className="font-bold cursor-pointer" onClick={handleGeneralAccountPair}>
              {t('AccountPair')}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="text-[#a90000] font-bold data-[state=open]:text-[#a90000]  data-[state=open]:bg-[#fff] cursor-pointer">
            {t('Language')}
          </MenubarTrigger>
          <MenubarContent className="border-none shadow-none">
            <MenubarItem className="font-bold cursor-pointer" onClick={() => changeLanguage('en')}>
              {t('English')}
            </MenubarItem>
            <MenubarItem className="font-bold cursor-pointer" onClick={() => changeLanguage('vi')}>
              {t('Vietnamese')}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Tabs defaultValue="SportsBook" className="flex-1 overflow-hidden pb-24">
        <TabsList className="text-black bg-[#e2e2e2] p-2">
          <TabsTrigger value="SportsBook" className="rounded-none py-[1px] px-3 text-[11px]  ">
            SportsBook
          </TabsTrigger>
          <div className="h-full border-l-[1px] border-gray-400 mx-3"></div>
          <TabsTrigger value="BetList" className="rounded-none py-[1px] px-3 text-[11px]">
            Bet List
          </TabsTrigger>
          <div className="h-full border-l-[1px] border-gray-400 mx-3"></div>
          <TabsTrigger value="ContraList" className="rounded-none py-[1px] px-3 text-[11px]">
            Contra List
          </TabsTrigger>
          <div className="h-full border-l-[1px] border-gray-400 mx-3"></div>
          <TabsTrigger value="SuccessList" className="rounded-none py-[1px] px-3 text-[11px]">
            Success List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="SportsBook" className="mx-4 h-full overflow-y-auto custom-scrollbar ">
          <SportsBook />
        </TabsContent>
        <TabsContent value="BetList" className="mx-4 h-full ">
          <BetList />
        </TabsContent>
        <TabsContent value="ContraList" className="mx-4 h-full ">
          <ContraList />
        </TabsContent>
        <TabsContent value="SuccessList" className="mx-4 h-full ">
          <SuccessList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
