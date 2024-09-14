export const Activities = ["Archive", "History", "Wallet"]
export const fetcher = (url: string) => fetch(url).then((res) => res.json())
