import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://getinsight-demo.net/api/" : "http://localhost:3000/api/",
});


