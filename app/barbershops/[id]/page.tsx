import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { BarbershopInfo } from "./_components/barbershopInfo";
import { ServiceItem } from "./_components/serviceItem";
import { Service } from "@prisma/client";


interface BarbershopDetailsPageProps{
  params: {
    id?: string;
  }
}

export default async function BarbershopDetailsPage({params}:BarbershopDetailsPageProps){

  if (!params.id){
    // TODO redirecionar para home page
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where:{
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop){
    // TODO redirecionar para home page
    return null
  }
  return(
   <div>
    <BarbershopInfo barbershop={barbershop}/>

    <div className="px-5 py-6 flex flex-col gap-3">
      {barbershop.services.map((service: Service)=>(
        <ServiceItem key={service.id} service={service}/>
       ))}
    </div>
   </div>
  )
}