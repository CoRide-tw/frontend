import NestedLayout from "@/modules/layouts/Nested";
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
      </NestedLayout>
    </>
  );
}
