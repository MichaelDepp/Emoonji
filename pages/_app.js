import * as React from 'react';
import Head from 'next/head';
import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';

function App({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<ColorModeProvider>
				<CSSReset />
				<Head>
					<title>Emoonji</title>
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Emoonji 🤖" />
					<meta
						property="og:description"
						content="Emoonji is an AI based Single Page Application, which tracks your facial expressions in real time and draw a suitable emoji"
					/>
					<meta property="og:image" content="https://emoonji.vercel.app/assets/mobile.jpg" />
					<meta property="og:image:alt" content="Emoonji 🤖" />
					<meta property="og:site_name" content="Emoonji 🤖" />
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:site" content="https://emoonji.vercel.app/" />
					<meta property="twitter:title" content="Emoonji 🤖" />
					<meta property="twitter:image" content="https://emoonji.vercel.app/assets/mobile.jpg" />
					<meta
						property="twitter:description"
						content="Emoonji is an AI based Single Page Application, which tracks your facial expressions in real time and draw a suitable emoji"
					/>
					<link rel="shortcut icon" href="./assets/favicon.png" />
					<link rel="shortcut icon" href="./assets/favicon.png" />
				</Head>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default App;
