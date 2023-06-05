import DriveCards from "@/modules/profile/components/HistoryTripCard";
import NestedLayout from "@/modules/layouts/Nested";
import HistoryPosts from "@/modules/profile/components/HistoryPosts";
import PersonalDetails from "@/modules/profile/components/PersonalDetails";
import { Hide } from "@chakra-ui/react";

export default function Profile() {
  return (
    <NestedLayout title="Profile">
      <PersonalDetails />
      <HistoryPosts />
    </NestedLayout>
  );
}
