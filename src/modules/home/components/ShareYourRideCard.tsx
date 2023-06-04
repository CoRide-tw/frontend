import { Box, Button, Text, Flex, Icon } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
export default function ShareYourRideCard() {
  return (
    <Box margin="20px">
      <Link href="/driver/share">
        <Flex
          w="100%"
          height="30%"
          bg="#EEEEEE"
          borderRadius="10px"
          border="1px "
          borderColor="#EEEEEE"
        >
          <Flex
            flexDirection="column"
            w="60%"
            justifyContent="center"
            margin="20px"
          >
            <Text fontWeight={700}>Become a driver and pick up passengers</Text>
            <Button marginTop="10px" height="min-content" borderRadius="20px">
              Share a ride
              <Icon as={AiOutlineArrowRight} margin="5px" />
            </Button>
          </Flex>
          <Flex
            w="40%"
            justifyContent="center"
            alignItems="center"
            position={"relative"}
          >
            <Image
              alt="driver"
              src="/Driver.png"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </Flex>
        </Flex>
      </Link>
    </Box>
  );
}
