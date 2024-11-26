'use client'

import {useState, useEffect} from 'react'
import {GuidePage} from "@/app/GuidePage";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      router.push('/signin');
    }
  }, []);

  return (
      <div>
        <GuidePage />
      </div>
  )
}