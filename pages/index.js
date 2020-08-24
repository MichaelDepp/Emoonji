import { Text, Link, useColorMode, useColorModeValue, IconButton, Box, Center, Container } from "@chakra-ui/core"
import Navbar from "../components/Navbar"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Stream from "../components/Stream"

function Index() {

    const { colorMode, toggleColorMode } = useColorMode()

    const bg = useColorModeValue("#F2F2F2", "#1A1A18")
    const color = useColorModeValue("#1A1A18", "#F2F2F2")
    return (
        <Box
            bg={bg}
            h="100vh"
            p={4} m="0"
            color={color}
        >
            <Center>
                <Container
                    maxW="70em"
                >
                    <Box float="right">
                        <IconButton
                            aria-label="Toggle dark mode"
                            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                            onClick={toggleColorMode}
                        />
                    </Box>
                    <Navbar></Navbar>
                    <Box
                        mt="1em"
                    >
                        <Center>
                            <Box
                            >
                                <Stream color={color} />
                                {/*<video id="video" width="720" height="560" autoPlay muted></video>*/}
                            </Box>
                        </Center>
                    </Box>
                    <Center
                        pt="1em"
                    >
                        <Text fontSize="sm" color={color} textAlign="center">
                            Emoonji can detect expressions like Neutral, Happy, Sad, Surprised, Angry, Disgusted, & Fearful
                        </Text>
                    </Center>
                    <Center>
                        <Box
                            position="fixed"
                            bottom="3"
                        >
                            <Center>
                                <Text color={color} fontSize="md">Developed by Michael Depp</Text>
                                <Link href="https://github.com/MichaelDepp" isExternal>
                                    <IconButton
                                        colorScheme="none"
                                        color={color}
                                        aria-label="Github Link"
                                        icon={<FaGithub />}
                                    />
                                </Link>
                                <Link href="https://www.linkedin.com/in/michael-singaram-murugan/" isExternal>
                                    <IconButton
                                        colorScheme="none"
                                        color={color}
                                        aria-label="Linkedin Link"
                                        icon={<FaLinkedin />}
                                    />
                                </Link>
                            </Center>
                        </Box>
                    </Center>

                </Container>
            </Center>
        </Box>
    )

}

export default Index