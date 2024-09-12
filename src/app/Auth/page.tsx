import SignInTab from "@/components/SignInTab"
import SignUpTab from "@/components/SignUpTab"
import { TabSwitcher } from "@/components/TabSwitcher"

export default function Auth() {
  return (
    <div className="relative flex w-full h-screen bg-background justify-center items-center">
      <div className="max-w-3xl">
        <TabSwitcher TabOne={<SignInTab />} TabTow={<SignUpTab />} />
      </div>
    </div>
  )
}
