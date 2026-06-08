let BASE_URL = "http://localhost:4000/";

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://your-production-url.com/";
}

export { BASE_URL };