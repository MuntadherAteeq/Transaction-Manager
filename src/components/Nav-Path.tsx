import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export const Nav_Path = (props: any) => {
  const currentActivity = usePathname().split("/").slice(1);
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${currentActivity}`}>
              {currentActivity}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator className="hidden md:block" /> */}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
