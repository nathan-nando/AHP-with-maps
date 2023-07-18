export const configs = () => {};

const getENV = process.env;

type myENV = {
    NODE_ENV:string
    BASE_API:string
    GOOGLE_MAPS_API_KEY:string
}
export const env:myENV = {
    NODE_ENV:getENV.NODE_ENV,
    BASE_API:getENV.REACT_APP_BASE_API,
    GOOGLE_MAPS_API_KEY: getENV.REACT_APP_GOOGLE_MAPS_API_KEY
}