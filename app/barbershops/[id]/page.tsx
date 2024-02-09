import { db } from "@/app/_lib/prisma";
import { BarbershopInfo } from "./_components/barbershopInfo";
import { ServiceItem } from "./_components/serviceItem";
import { Service } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";



interface BarbershopDetailsPageProps{
  params: {
    id?: string;
  }
}

export default async function BarbershopDetailsPage({params}:BarbershopDetailsPageProps){
  const section = await getServerSession(authOptions);
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
        <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!section?.user}/>
       ))}
    </div>
   </div>
  )
}