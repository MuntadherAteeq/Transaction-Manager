"use server"

import { Record } from "@prisma/client"

export const changeProperties = async (record: Record) => {
  try {
    console.log(record)
    await prisma.record.update({
      where: { id: record.id },
      data: {
        phone: record.phone,
        balance: Number(record.balance),
        email: record.email,
        desc: record.desc,
        address: record.address,
        category: record.category,
      },
    })
    return { error: "", status: 200 }
  } catch (error) {
    return { error: error, status: 500 }
  }
}
