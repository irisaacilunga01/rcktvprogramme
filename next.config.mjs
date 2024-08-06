/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "3188",
      database: "gestionhotelokapi",
    },
  },
};

export default nextConfig;
