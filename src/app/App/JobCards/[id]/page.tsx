import { redirect } from "next/navigation";
import { JobCardForm } from "../Job-Card-Form";

export default async function JobCardPreview(props: any) {
  const id = (await props.params).id;

  console.log("id", id);

  const jobCard = await prisma.jobCard.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Vehicle: true,
    },
  });

  if (!jobCard) {
    redirect("/App/JobCards");
  }

  return <JobCardForm editable={false} />;
}
