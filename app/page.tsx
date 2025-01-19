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
      <div className="hidden md:block">
        <div className=" absolute top-0 left-0">
          <HeroSection images={images} />
        </div>
        <div className="pt-[2640px]">
          <InputSection onNewImage={handleNewImage} />
        </div>
      </div>
    </div>
  );
}
