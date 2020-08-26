import * as React from "react"
import Head from "next/head"
import { ChakraProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

function App({ Component, pageProps }) {
    console.log("Hello from APP")

    return (
        <ChakraProvider theme={theme}>
            <ColorModeProvider>
                <CSSReset />
                <Head>
                    <title>Emoonji</title>
                    <link rel="shortcut icon" href="./assets/favicon.png" />
                </Head>
                <Component {...pageProps} />
            </ColorModeProvider>
        </ChakraProvider>
    )
}

export default App;