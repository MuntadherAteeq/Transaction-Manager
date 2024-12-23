import SignInTab from "@/components/SignInTab";
import SignUpTab from "@/components/SignUpTab";
import { TabSwitcher } from "@/components/TabSwitcher";
import { getUser } from "../Library/lucia";
import { redirect } from "next/navigation";
import Link from "next/link";
import Logo_Icon from "../Assets/Icons/Logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { ImageSlider } from "../Components/ImageSlider";

export default async function Auth() {
  (await getUser()) ? redirect("/") : null;
  return (
    <div className=" flex relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className=" flex justify-between relative h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r sm:hidden">
        <div className="  absolute inset-0 bg-card " />
        <div className=" relative z-20 flex items-center text-3xl font-medium gap-2">
          <Logo_Icon className="w-12 h-12" />
          <span>Transaction Manager</span>
        </div>
        {/* <ImageSlider /> */}
        <div className="relative z-20">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Transaction Manager is a powerful tool designed to help you
              manage your financial transactions with ease and efficiency. It
              offers a seamless user experience and robust features to keep your
              finances in check.&rdquo;
            </p>
            <footer className="text-sm">
              Developed by
              <span>
                <Link
                  passHref
                  legacyBehavior
                  href={"https://github.com/MuntadherAteeq"}
                >
                  <a
                    className="inline-block items-center select-none  text-gray-300 hover:text-gray-100 ml-2"
                    target="_blank"
                  >
                    <GitHubLogoIcon className="w-4 h-4 inline " />
                    <span className="ml-1">MuntadherAteeq</span>
                  </a>
                </Link>
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 ">
            <TabSwitcher TabOne={<SignInTab />} TabTow={<SignUpTab />} />
          </div>
        </div>
      </div>
    </div>
  );
}
