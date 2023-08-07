import Head from "next/head";
import About from "../../components/pages/About";

export default function index() {
  return (
    <>
    <Head>
    <title>Sikka & Associates- About</title>
    <meta charSet="utf-8" />
    <link rel="icon" href='https://res.cloudinary.com/da75fckow/image/upload/v1683447238/sikka-warehouse/logo_ul5ndq.png' />
    <meta property="og:locale" content="en_US" />
    <meta name="description" content="sikka_and_associates_desc" />
    <meta property="og:title" content="Sikka & Associates - About" />
    <meta name="keywords" content="sikka_and_associates_keywords" />
    <meta property="og:url" content="https://warehouseservicez.com/" />
    {/* <meta name="author" content="Your name here" /> */}
    <meta property="og:image" itemProp='https://res.cloudinary.com/da75fckow/image/upload/v1683447238/sikka-warehouse/logo_ul5ndq.png'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
    <link rel="canonical" href="https://warehouseservicez.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="sikka_and_associates_desc" />
    <meta property="og:site_name" content="Sikka & Associates" />
    </Head>
    <About/>
    </>
  )
}
