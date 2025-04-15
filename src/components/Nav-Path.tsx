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

interface NavRecordItemProps {
  src: string;
  title: string;
}

export const Nav_Path: React.FC = () => {
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
                <NavRecordItem
                  src={`https://picsum.photos/id/${index}/200/200`}
                  title={"Untitled Record"}
                />
              ) : (
                <BreadcrumbItem className="max-sm:hidden">
                  <BreadcrumbLink
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    className="text-sm"
                  >
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
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
    <RecordDrawer className="h-full">
      <BreadcrumbItem>
        <Avatar>
          <AvatarImage src={props.src} alt="Record Image" />
          <AvatarFallback>RM</AvatarFallback>
        </Avatar>
        <span className="text-sm truncate font-semibold ps-1 text-foreground">
          {props.title}
        </span>
      </BreadcrumbItem>
    </RecordDrawer>
  );
}
