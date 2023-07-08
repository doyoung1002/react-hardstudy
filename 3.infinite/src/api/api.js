import axios from "axios";

const Pet = axios.create({
  baseURL: "https://api.thedogapi.com",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "j",
  },
});

export const readPetData = async (page) => {
  const response = await Pet.get("/v1/images/search", {
    params: {
      format: "json",
      limit: 10,
      page: page,
      has_breeds: true,
      order: "ASC",
    },
  });
  return response;
};