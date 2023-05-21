import NestedLayout from "@/modules/layouts/Nested";
import { Box, Center, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RequestsListView() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (router.query.new === "1") {
      toast({
        title: "Share Success",
        status: "success",
        duration: 1600,
        position: "bottom",
      });
    }
  }, [router.query]);

  return (
    <NestedLayout title="Driver List">
      <Center h="full" color="blackAlpha.600">
        No Rider Request
      </Center>
    </NestedLayout>
  );
}
