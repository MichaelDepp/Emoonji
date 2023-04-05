import { Box, Flex, Heading, Button, useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';

function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();

	const bg = useColorModeValue('#F2F2F2', '#1A1A18');
	const color = useColorModeValue('#1A1A18', '#F2F2F2');
	return (
		<Flex bg={bg} w="100%" justifyContent="center" alignItems="center">
			<Flex flexDirection="row" justifyContent="center" alignItems="center">
				<Heading pl={3} color={color} fontWeight={700}>
					Emoonji
				</Heading>
			</Flex>
		</Flex>
	);
}

export default Navbar;
