const API_GATEWAY_DOMAIN = process.env.SERVICES_ENDPOINT
const HOSTNAME = process.env.SERVICES_HOSTNAME

const PROD_API_GATEWAY_DOMAIN = ''
const DEV_API_GATEWAY_DOMAIN = ''

const PROD = {
  coreAPI: process.env.NEXT_PUBLIC_CORE_API_ENDPOINT, //check this
  googleMapsAPI: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapBoxAPIKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY
}

const Config = {
  coreAPI: process.env.NEXT_PUBLIC_CORE_API_ENDPOINT,
  googleMapsAPI: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapBoxAPIKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY
}

/** TODO-production: Change this */
const APIConfig = PROD

export default APIConfig
