"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { onAuthStateChange } from "@/lib/firebase";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSection from "@/components/sections/LoadingSection";
import HeroSection from "@/components/sections/HeroSection";
import InputSection from "@/components/sections/InputSection";
import HistoryImagesSection from "@/components/sections/HistoryImagesSection";
import { Edit, Settings, LogOut, HomeIcon } from "lucide-react";
import HomeSection from "@/components/sections/HomeSection";
import { useRouter } from "next/navigation";

interface ImageObject {
  _id: string;
  image: string; // Base64-encoded image string
  prompt: string; // Image generation prompt
}

export default function Home() {
  const router = useRouter();

  const [images, setImages] = useState<ImageObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user);
        console.log("User is now: ", user);
        fetchSavedImages(user.uid); // Fetch images when the user logs in
      } else {
        setUser(null);
        setImages([]); // Clear images when user signs out
        setLoading(false); // Stop loading if there's no user
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchSavedImages = async (userId: string) => {
    console.log("Fetching..?");
    try {
      console.log("Fetching from API for user:", userId);
      const response = await fetch(`/api/savedImages?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved images");
      }

      const data = await response.json();
      setImages(data || []); // Now expecting an array of image objects
      setLoading(false); // Stop loading after fetching images
      console.log("Fetched images:", data);
    } catch (error) {
      console.error("Error fetching saved images:", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  const handleNewImage = () => {
    if (user?.uid) {
      fetchSavedImages(user.uid); // Fetch images again after a new image is added
    } else {
      console.error("User not authenticated");
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="">
        <div className="absolute top-0 left-0">
          <HeroSection images={images} />
        </div>

        <div className="md:hidden">
          <div className="motion-preset-slide-right motion-duration-1500 px-[8vw] bg-[#111111] text-center relative py-20 md:py-20 w-full left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
              The Ultimate Studio for
              <br /> AI Image Generation
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
              Create stunning, custom images with just a few clicks. Enter your
              prompt, customize settings, and let our advanced AI generate
              high-quality visuals instantly. Perfect for designers, developers,
              and creatives looking for fast, tailored results.
            </p>
          </div>
        </div>

        <div className="md:pt-[2640px] pt-20">
          <InputSection onNewImage={handleNewImage} />
        </div>
      </div>
    </div>
  );
}
