export const base_url = "https://www.glistenastrology.com/api/v1/";
export const file_url = "https://www.glistenastrology.com/public/";

// export const base_url = "http://localhost:5000/api/v1/";
// export const file_url = "http://localhost:5000/public/";
export const image_url = file_url + "images/";

const auth = {
  signup: "user/signup",
  update: "user/updateProfile",
  astro_signin: "astrologer/signin",
  astro_signup: "astrologer/signup",
};

const user = {
  astros: "user/listAstrologer",
  astro_update: "astrologer/updateProfile",
  postService: "user/postService",
};

const services = {
  get_services: "astrologer/getAssignedServices",
  mark_service: "astrologer/markServiceCompleted",
};
const broadcast = {
  add: "admin/addBroadCast",
  get: "astrologer/getBroadcastListing",
};

export { auth, user, services, broadcast };
