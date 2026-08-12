"use client"

import { getDoctors } from "@/app/(commonLayout)/consultation/_actions"
import { useQuery } from "@tanstack/react-query"

const DoctorsList = () => {
   const { data:doctors } = useQuery({
  queryKey: ['doctors'],
      queryFn: getDoctors,
  })
  console.log(doctors?.data);
  return (
    <div>DoctorsList</div>
  )
}
export default DoctorsList