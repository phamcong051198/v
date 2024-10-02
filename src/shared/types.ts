export type PlatformType = {
  id: number
  url: string
  name: string
  sportsBook: string
}

export type DataPlaceBet = {
  id: number
  idLeague: number
  nameLeague: string
  idEvent: number
  nameHome: string
  nameAway: string
  number: number
  altLineId: number
  hdp_point: number
  home_over: number
  away_under: number
  typeOdd: string
  league: string
  home: string
  away: string
  specialOdd: number
  betType: number
  HDP: number
  bet: string
  odd: number
  profit: number
  amount: number
  loginID: string
  password: string
  expiredPassword: string
  idPlatform: number
  platformName: string
  loginURL: string
  customIP: string
  proxyIP: string
  proxyPort: string
  proxyUsername: string
  proxyPassword: string
  proxyScope: string
  refresh: number
  autoLogin: number
  lockURL: number
  cookie: string
  host: string
  socketUrl: string | null
  statusLogin: number
  idAccount: number
  company: string
  coverage: string
  gameType: string
  time: string
}

export type AccountType = {
  id: number
  loginID: string
  password: string
  expiredPassword: string
  idPlatform: number
  platformName: string
  loginURL: string
  customIP: string
  proxyIP: string
  proxyPort: string
  proxyUsername: string
  proxyPassword: string
  proxyScope: string
  bet: boolean
  refresh: boolean
  autoLogin: boolean
  lockURL: boolean
  cookie: string
  host: string
  socketUrl: string
  statusLogin: boolean
}

export interface DataPlatformType extends PlatformType {
  accounts: AccountType[]
}

export type SportsBookType = {
  id: number
  name: string
  status: number
}
