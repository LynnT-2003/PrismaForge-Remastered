"use client";
import { useEffect } from "react";
import { models } from "@/constants/models";
import { TemplateCard } from "@/components/template-card";

const TemplatesPage = () => {
  useEffect(() => {
    // localStorage.removeItem("model");
    localStorage.clear();
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="px-12 my-5 md:my-8 text-4xl md:text-5xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
        Generative AI Models
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1500px] px-5 md:px-12 xl:px-0">
        {models.map((model, index) => (
          <TemplateCard
            key={index}
            title={model.title}
            thumbnail={model.thumbnail}
            subtitle={model.subtitle}
            route={model.route}
            model={model.model}
          />
        ))}
        <div className="flex flex-col items-center justify-center md:w-[35vw] rounded-lg text-white/[0.5] font-sans text-2xl md:text-4xl py-8 md:pb-0">
          <h1 className="text-center">More Coming Soon.</h1>
          <h1 className="text-lg md:text-[1.5rem] mt-2">Stay tuned..</h1>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
