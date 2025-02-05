"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// Define the props the component expects
interface TemplateCardProps {
  title: string;
  thumbnail: string;
  subtitle: string;
  route: string;
  model: string;
}

export function TemplateCard({
  title,
  thumbnail,
  subtitle,
  route,
  model,
}: TemplateCardProps) {
  const router = useRouter();
  return (
    <div className="bg-[#181818] w-full px-0 lg:px-5 xl:w-[35%] rounded-lg border-white/[0.1] border">
      <div className="px-5 flex flex-col lg:flex-row lg:space-x-7 h-full lg:mr-4">
        <div className="w-full lg:w-[40%] max-h-[150px] lg:max-h-none min-h-[150px] lg:my-5 flex items-center aspect-square relative">
          <Image
            src={thumbnail} // Using the dynamic thumbnail prop
            alt={title} // Using the title for the alt text
            className="rounded-2xl object-cover"
            fill
          />
        </div>

        <div className="lg:w-[60%] pt-5 pb-4 my-1 flex flex-col">
          <div className="h-full flex flex-col">
            <h1 className="font-bold font-sans mb-0 text-base">{title}</h1>
            <h1 className="font-sans text-base py-4 line-clamp-8 lg:line-clamp-5">
              {subtitle}
            </h1>
            <Button
              size="sm"
              className="mt-4 md:mt-auto"
              onClick={() => {
                router.push(route);
                localStorage.setItem("model", model);
              }}
            >
              Try it out <ArrowRight className="w-3 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
