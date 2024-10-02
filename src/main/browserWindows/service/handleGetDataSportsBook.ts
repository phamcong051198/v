import { Account, Platform, SportsBook } from '@db/model'
import { AccountType, SportsBookType } from '@shared/types'

export function handleGetDataSportsBook() {
  const sportsBookActive = SportsBook.findOne({ status: 1 }) as SportsBookType
  const listPlatform = Platform.findAll({ sportsBook: sportsBookActive.name })
  const listAccount = Account.findAll() as AccountType[]

  const dataSportsBook = listPlatform.map((sportBook) => {
    const accounts = listAccount.filter((account) => account.idPlatform === sportBook.id)
    return { ...sportBook, accounts }
  })
  return dataSportsBook
}
