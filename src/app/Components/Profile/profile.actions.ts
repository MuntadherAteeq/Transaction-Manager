"use server"

export const changeProperty = async (
  id: number,
  property: string,
  value: number | string | Date | boolean | null 
) => {
  try {
    prisma.record.update({
      where: {
        id,
      },
      data: {
        [property]: value,
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    return { error: error, status: 500 }
  }
}
