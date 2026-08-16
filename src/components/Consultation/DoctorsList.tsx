"use client"

import { getDoctors } from "@/services/consultation.services";
import { IDoctor } from "@/types/doctor.type";
import { useQuery } from "@tanstack/react-query";

const DoctorsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['doctors'],
    // Cast the return value so TypeScript knows data contains IDoctor[]
    queryFn: async () => (await getDoctors()) as { data: IDoctor[] },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctors</p>;

  return (
    <div>
      {data?.data?.map((doctor) => (
        <p key={doctor.id}>{doctor.name}</p>
      ))}
    </div>
  );
};

export default DoctorsList;