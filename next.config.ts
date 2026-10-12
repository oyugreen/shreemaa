import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/10.x/**",
      },
    ],
  },
  async redirects() {
    return [
      // Exports is part of Global Trade (Rio World); there is no separate page.
      { source: "/businesses/exports", destination: "/businesses/global-trade", permanent: true },
      // Add 301s for the old Wix site's URLs here once that URL list is exported.
    ];
  },
};

export default nextConfig;
