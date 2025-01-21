"use client";
import { TemplateCard } from "@/components/template-card";

const TemplatesPage = () => {
  const templates = [
    {
      title: "Animate your look",
      thumbnail: "/templates/cartoon.png",
      route: "/models/cartoon",
      subtitle:
        "Turn any selfie into a fun and unique cartoon. Experiment with bold outlines, vibrant colors, and stylized effects to create your animated alter-ego.",
    },
    {
      title: "Christmas Theme",
      thumbnail: "/templates/christmas.png",
      route: "/models/christmas",
      subtitle:
        "Add a festive touch to your photos with Christmas designs. Choose from holiday lights, snow effects, and custom frames.",
    },
    {
      title: "Test your Fortune",
      thumbnail: "/templates/fortune.jpg",
      route: "/models/fortune",
      subtitle:
        "Get fun, personalized fortune readings in seconds. Upload your photo to reveal mystical insights with colorful illustrations and cosmic designs.",
    },
    {
      title: "Style your Hair",
      thumbnail: "/templates/hair.jpg",
      route: "/models/fortune",
      subtitle:
        "Get fun, personalized fortune readings in seconds. Upload your photo to reveal mystical insights with colorful illustrations and cosmic designs.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="px-12 my-5 md:my-8 text-4xl md:text-5xl text-center font-bold font-sans relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 pb-4">
        Generative AI Templates
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {templates.map((template, index) => (
          <div key={index}>
            <TemplateCard
              title={template.title}
              thumbnail={template.thumbnail}
              subtitle={template.subtitle}
              route={template.route}
            />
          </div>
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
