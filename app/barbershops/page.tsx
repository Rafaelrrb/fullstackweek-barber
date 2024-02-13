import { Barbershop } from "@prisma/client";
import { BarbershopItem } from "../(home)/_components/barbershopItem";
import { Header } from "../_components/header";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";

interface BarbershopsPageProps{
  searchParams:{
    search?: string;
  }
}

export default async function BarbershopsPage({searchParams}:BarbershopsPageProps){
  if(!searchParams){
    redirect("/")
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })
  return(
    <>
      <Header/>
      
      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para "{searchParams.search}"
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop: Barbershop) =>(
            <div key={barbershop.id} className="w-full">
              <BarbershopItem  barbershop={barbershop}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}