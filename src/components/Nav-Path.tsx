import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RecordDrawer } from "@/components/Record/Records";
import { Button } from "./ui/button";
import avatar from "@/assets/images/Avatar.png";

export const NavPath: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || []; // Handle undefined pathname
  const router = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              {index === 1 ? (
                <NavRecordItem src={avatar.src} title={"Untitled Record"} />
              ) : (
                <Button variant="ghost" className=" h-full p-1 px-2">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => {
                        router.push(
                          `/${pathSegments.slice(0, index + 1).join("/")}`
                        );
                      }}
                      className="text-lg"
                    >
                      {segment}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Button>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export function NavRecordItem(props: any) {
  return (
    <RecordDrawer>
      <Button variant={"ghost"} className="p-1 px-2">
        <BreadcrumbItem>
          <Avatar>
            <AvatarImage src={props.src} alt="Record Image" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          <span className="text-sm truncate font-semibold ps-1 text-foreground">
            {props.title}
          </span>
        </BreadcrumbItem>
      </Button>
    </RecordDrawer>
  );
}
