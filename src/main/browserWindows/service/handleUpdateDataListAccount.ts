import { Account } from '@db/model'
import { AccountType } from '@shared/types'

export function handleUpdateDataListAccount(dataAccountInfo: AccountType[]) {
  for (const account of dataAccountInfo) {
    Account.update(
      { id: account.id },
      {
        loginID: account.loginID,
        password: account.password,
        expiredPassword: account.expiredPassword,
        customIP: account.customIP,
        proxyIP: account.proxyIP,
        proxyPort: account.proxyPort,
        proxyUsername: account.proxyUsername,
        proxyPassword: account.proxyPassword,
        proxyScope: account.proxyScope
      }
    )
  }
}
