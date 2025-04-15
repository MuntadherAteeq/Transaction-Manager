import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MenubarItem } from "./ui/menubar";
import { RecordDrawer } from "@/layouts/Record/Records";
import { Button } from "./ui/button";

interface NavRecordItemProps {
  src: string;
  title: string;
}

export const NavPath: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean) || []; // Handle undefined pathname

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={index}>
              {index === 1 ? (
                <NavRecordItem title={"Untitled Record"} />
              ) : (
                <Button
                  variant="ghost"
                  className=" max-sm:hidden h-full p-1 px-2"
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => {
                        history.go(-(index + 1));
                      }}
                      className="text-sm"
                    >
                      {segment}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Button>
              )}
              {!isLast && <BreadcrumbSeparator className="max-sm:hidden" />}
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
