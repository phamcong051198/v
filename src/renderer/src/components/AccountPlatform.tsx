import React, { useEffect, useState, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import Xcircle from '@renderer/icons/x-circle'
import { Checkbox } from '@/components/ui/checkbox'
import { AccountType } from '@shared/types'

interface AccountPlatformProps {
  account: AccountType
  index: number
}

const CheckboxField: React.FC<{
  id: string
  label: string
  checked: boolean
  onChange: () => void
}> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center pr-3">
    <Checkbox
      id={id}
      className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
      checked={checked}
      onCheckedChange={onChange}
    />
    <label htmlFor={id} className="pl-1.5">
      {label}
    </label>
  </div>
)

export const AccountPlatform: React.FC<AccountPlatformProps> = ({ account, index }) => {
  const [log, setLog] = useState<string | null>(() => {
    if (account) {
      const data = sessionStorage.getItem(`${account.loginID}_${account.platformName}_log`)
      return data ? JSON.parse(data) : null
    }
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [betCredit, setBetCredit] = useState<number>(0)

  useEffect(() => {
    const storedUsername = sessionStorage.getItem(`${account.loginID}_${account.platformName}`)
    if (storedUsername) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    const listener = (_, data: { idAccount: number; log: string }) => {
      if (account?.id === data.idAccount && account.loginID) {
        const storageKey = `${account.loginID}_${account.platformName}_log`
        sessionStorage.setItem(storageKey, JSON.stringify(data.log))
        setLog(data.log)
      }
    }

    window.electron.ipcRenderer.on('DataLog', listener)

    return () => {
      window.electron.ipcRenderer.removeAllListeners('DataLog')
    }
  }, [account])

  useEffect(() => {
    const listener = (_, data: { platform: string; loginID: string; betCredit: number }) => {
      if (account.platformName === data.platform && account.loginID === data.loginID) {
        setBetCredit(data.betCredit)
      }
    }

    window.electron.ipcRenderer.on('DataAccountBalanceP88', listener)
    return () => {
      window.electron.ipcRenderer.removeAllListeners('DataAccountBalanceP88')
    }
  }, [])

  const handleLogin = useCallback(() => {
    if (account && account.loginID) {
      sessionStorage.setItem(`${account.loginID}_${account.platformName}`, 'true')
      window.electron.ipcRenderer.send('LoginAccount', account)
      setIsLoggedIn(true)
      setLog('Waiting for login ...')
    }
  }, [account])

  const handleLogout = useCallback(() => {
    window.electron.ipcRenderer.send('LogoutAccount', { account })
    sessionStorage.removeItem(`${account.loginID}_${account.platformName}`)
    sessionStorage.setItem(
      `${account.loginID}_${account.platformName}_log`,
      'Waiting for login ...'
    )
    setIsLoggedIn(false)
    setBetCredit(0)
  }, [account])

  const deleteAccount = useCallback((account: AccountType) => {
    window.electron.ipcRenderer.send('DeleteAccount', account)
  }, [])

  const handleCheckboxChange = useCallback(
    (accountId: number, field: string) => {
      const isCheckBox = !account[field]
      console.log({
        accountId,
        field,
        isCheckBox
      })
    },
    [account]
  )

  return (
    <div className="flex items-center">
      <div className="flex items-center w-72">
        <AlertDialog>
          <AlertDialogTrigger>
            <Xcircle className="text-red-500 size-8 cursor-pointer hover:text-red-600" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation?</AlertDialogTitle>
              <AlertDialogDescription>Confirm delete this item?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteAccount(account)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="ml-1 mr-4 ">{index + 1}</div>
        <div className="underline text-blue-600">
          {account.platformName}
          {'-'}
          {account.loginID ?? ''}
        </div>
      </div>
      <p className="border border-gray-500 w-[176px] h-6 bg-white pl-1 mr-2">{account.loginURL}</p>
      {isLoggedIn ? (
        <div
          className="mr-4 w-10 font-bold underline text-red-500 hover:cursor-pointer"
          onClick={handleLogout}
        >
          logout
        </div>
      ) : (
        <div
          className={twMerge(
            'mr-4 font-bold underline w-10',
            account.loginID && account.password
              ? 'text-blue-800 hover:cursor-pointer hover:text-blue-600'
              : 'text-gray-600'
          )}
          onClick={account.loginID && account.password ? handleLogin : undefined}
        >
          login
        </div>
      )}
      <div className="mr-14">Cr:</div>
      <div className="flex">
        <p className=" w-11 mr-1 text-end">{betCredit}</p>
        <div className="flex mr-2">
          {['bet', 'refresh', 'autoLogin', 'lockURL'].map((field) => (
            <CheckboxField
              key={field}
              id={`${account.id}${field}`}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              checked={account[field]}
              onChange={() => handleCheckboxChange(account.id, field)}
            />
          ))}
        </div>
      </div>
      <div
        className={twMerge(
          'flex-1 h-6 flex items-center justify-start overflow-hidden  text-ellipsis',
          isLoggedIn ? 'bg-green-400' : 'bg-zinc-400'
        )}
      >
        {isLoggedIn && <p className="px-2 whitespace-nowrap  ">{log ?? 'Waiting for login ...'}</p>}
      </div>
      <div className="mx-2 underline text-lg text-blue-800">...</div>
    </div>
  )
}
