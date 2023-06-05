import HomeLayout from "@/modules/layouts/Home";
import RiderSearchInput from "@/modules/components/RiderSearchInput";
import ShareYourRideCard from "@/modules/home/components/ShareYourRideCard";
import YourTripsSection from "@/modules/home/components/YourTripsSection";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - CoRide</title>
      </Head>
      <HomeLayout>
        <RiderSearchInput />
        <ShareYourRideCard />
        <YourTripsSection />
      </HomeLayout>
    </>
  );
}
