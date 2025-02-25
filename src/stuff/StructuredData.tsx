import React from "react";
import Head from "next/head";

interface StructuredDataProps {
  type: "WebApplication" | "WebPage" | "SportsActivity" | "HowTo";
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  // For HowTo schema
  steps?: string[];
  totalTime?: string;
  // For SportsActivity
  activityType?: string;
  sportsActivityLocation?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  steps,
  totalTime,
  activityType,
  sportsActivityLocation,
}) => {
  let structuredData;

  if (type === "WebApplication") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name,
      description,
      url,
      applicationCategory: "SportsApplication",
      operatingSystem: "Any",
      ...(imageUrl && { image: imageUrl }),
    };
  } else if (type === "WebPage") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      description,
      url,
      ...(imageUrl && { image: imageUrl }),
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
    };
  } else if (type === "SportsActivity") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsActivity",
      name,
      description,
      url,
      ...(activityType && { activityType }),
      ...(sportsActivityLocation && { location: sportsActivityLocation }),
      ...(imageUrl && { image: imageUrl }),
    };
  } else if (type === "HowTo") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      description,
      url,
      ...(totalTime && { totalTime }),
      ...(imageUrl && { image: imageUrl }),
      ...(steps && {
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          text: step,
        })),
      }),
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default StructuredData;
