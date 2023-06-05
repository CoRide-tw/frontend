import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const Title = () => {
  return (
    <ChakraBox
      fontSize="5xl"
      fontWeight={700}
      color={"white"}
      animate={{
        scale: [1, 1.2, 1.2, 1],
      }}
      transition={{
        duration: "3",
        ease: "easeInOut",
        repeatType: "loop",
      }}
    >
      CoRide
    </ChakraBox>
  );
};
