import NestedLayout from "@/modules/layouts/Nested";
import FindAvailableSection from "@/modules/rider/components/FindAvailableSection";
import { Center } from "@chakra-ui/react";

import { useRouteRankings } from "@/modules/api/swr/useRouteRankings";
import { useRiderSearchInput } from "@/modules/components/RiderSearchBar/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SearchInputDisplaySection from "@/modules/rider/components/SearchInputDisplaySection";

export default function SearchResultPage() {
  const router = useRouter();
  const { inputState } = useRiderSearchInput();
  const { data, error, isLoading } = useRouteRankings();

  useEffect(() => {
    if (!inputState) {
      router.replace("/rider/search");
    }
  }, [inputState, router]);

  if (!data) {
    return (
      <NestedLayout title="Request Your Ride">
        <Center h="calc(100vh - 60px)" color="blackAlpha.600">
          No Drivers are available at the moment.
        </Center>
      </NestedLayout>
    );
  }
  return (
    <NestedLayout title="Request Your Ride">
      <SearchInputDisplaySection />
      <FindAvailableSection />
    </NestedLayout>
  );
}
