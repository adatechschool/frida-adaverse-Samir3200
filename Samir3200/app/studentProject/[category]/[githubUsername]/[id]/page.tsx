"use client";

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RedirectToCleanUrl() {
  const params = useParams();
  const router = useRouter();
  const { category, githubUsername } = params as { category?: string; githubUsername?: string };

  useEffect(() => {
    if (category && githubUsername) {
      router.replace(`/studentProject/${encodeURIComponent(category)}/${encodeURIComponent(githubUsername)}`);
    }
  }, [category, githubUsername, router]);

  return null;
}
