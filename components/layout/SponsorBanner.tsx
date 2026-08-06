import React from "react";
import AdPlaceholder from "@/components/common/AdPlaceholder";

export default function SponsorBanner({ location = "mid_page_leaderboard" }: { location?: string }) {
  return (
    <div className="newspaper-sponsor-banner-wrapper" aria-label="Google AdSense Leaderboard Placeholder">
      <AdPlaceholder format="728x90" />
    </div>
  );
}
