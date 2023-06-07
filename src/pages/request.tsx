import NestedLayout from "@/modules/layouts/Nested";
import RequestListView from "@/modules/request/ListView";
import Head from "next/head";

interface Props {}

export default function RequestPage({}: Props) {
  return (
    <>
      <Head>
        <title>Your Requests - CoRide</title>
      </Head>
      <NestedLayout title="Profile">
        <RequestListView />
      </NestedLayout>
    </>
  );
}
