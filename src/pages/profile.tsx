import NestedLayout from "@/modules/layouts/Nested";
import HistoryPosts from "@/modules/profile/components/HistoryPosts";
import PersonalDetails from "@/modules/profile/components/PersonalDetails";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile - CoRide</title>
      </Head>
      <NestedLayout title="Profile">
        <PersonalDetails />
        <HistoryPosts />
      </NestedLayout>
    </>
  );
}
