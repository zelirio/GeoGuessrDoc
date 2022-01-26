import '../styles/globals.css'
import {cookiesProvider} from "react-cookie"
function MyApp({ Component, pageProps }) {
  return( 
  <cookiesProvider>
    <Component {...pageProps} />
  </cookiesProvider>
  
  )
}

export default MyApp
