import { Box, Text, HStack } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <HStack spacing={2} alignItems="center">
      <Box position="relative" width="40px" height="40px">
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient="linear(to-r, #7FFFD4, #98FB98)"
          borderRadius="full"
          transform="rotate(45deg) scale(0.7, 1)"
          filter="blur(1px)"
          opacity="0.9"
          _after={{
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80%',
            height: '80%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 'full',
            background: 'rgba(0, 0, 0, 0.1)',
            filter: 'blur(2px)',
          }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient="linear(to-l, #7FFFD4, #98FB98)"
          borderRadius="full"
          transform="rotate(-45deg) scale(0.7, 1)"
          filter="blur(1px)"
          opacity="0.9"
        />
      </Box>
      <Text
        fontSize="2xl"
        fontWeight="black"
        bgGradient="linear(to-r, #7FFFD4, #98FB98)"
        bgClip="text"
        letterSpacing="tight"
        ml={2}
      >
        HyPeg
      </Text>
    </HStack>
  );
};