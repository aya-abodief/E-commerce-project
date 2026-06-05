import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
eslient:{
  ignoreDuringBuild:true ,
 
},
typeScript :{
  ignoreBuildErrors:true,
},
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-products/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-brands/**',
        search: '',
      }
      ,
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-categories/**',
        search: '',
      }
    ],
  },
};

export default nextConfig;
