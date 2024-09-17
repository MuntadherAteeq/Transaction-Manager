export const Activities = ["Archive", "History", "Wallet", "Dashboard"]
export const fetcher = (url: string) => fetch(url).then((res) => res.json())
