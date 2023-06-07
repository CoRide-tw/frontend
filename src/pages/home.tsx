import HomeLayout from "@/modules/layouts/Home";
import ShareYourRideCard from "@/modules/home/components/ShareYourRideCard";
import YourTripsSection from "@/modules/home/components/YourTripsSection";
import Head from "next/head";
import GreetingSection from "@/modules/home/components/GreetingSection";
import PageBar from "@/modules/home/components/PageBar";
import CurrentRequestSection from "@/modules/home/components/CurrentRequestSection";
import CurrentRouteSection from "@/modules/home/components/CurrentRouteSection";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home - CoRide</title>
      </Head>
      <HomeLayout>
        <GreetingSection />
        <ShareYourRideCard />
        <PageBar />
        <YourTripsSection />
        <CurrentRequestSection />
        <CurrentRouteSection />
      </HomeLayout>
    </>
  );
}
