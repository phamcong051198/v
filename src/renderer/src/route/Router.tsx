import { Routes, Route, HashRouter } from 'react-router-dom'
import { Path } from '@renderer/route/Path'
import { AccountPair } from '@renderer/windows/AccountPair'
import Main from '@renderer/windows/Main'
import Setting from '@renderer/windows/Setting'
import Login from '@renderer/windows/Login'
import InitApp from '@renderer/windows/InitApp'
import ListSportBook from '@renderer/windows/ListPlatform'
import { ListAccountByPlatform } from '@renderer/windows/ListAccountByPlatform'

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path={Path.main} element={<Main />} />
        <Route path={Path.setting} element={<Setting />} />
        <Route path={Path.accountPair} element={<AccountPair />} />
        <Route path={Path.login} element={<Login />} />
        <Route path={Path.initApp} element={<InitApp />} />
        <Route path={Path.listSportBook} element={<ListSportBook />} />
        <Route path={Path.accountList} element={<ListAccountByPlatform />} />
      </Routes>
    </HashRouter>
  )
}

export default Router
