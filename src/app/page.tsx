import { Button } from "@/components/ui/button"

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Button>Click me</Button>
      {children}
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Next.js</h1>
    </>
  )
}
