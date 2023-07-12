let BASE_URL = "https://redpost-k02.netlify.app/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "Development") {
  BASE_URL = "http://localhost:4000/";
}

export { BASE_URL };
