import '@/styles/globals.css'
import { DatosProvider } from '../context/useContext';

export default function App({ Component, pageProps }) {
  return  (
  <DatosProvider>
    <Component {...pageProps} />
  </DatosProvider>
  )
}
