import {environment} from "../../environments/environment";

let baseUrl = environment.production ?  'https://cosmic-cosmetics.herokuapp.com/' : '/api/';
export const URLS = {
  baseApi: baseUrl,
  icons:'services/icons/'
};

