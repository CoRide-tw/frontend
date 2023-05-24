import TopLayout from "@/modules/layouts/Top";
import RiderSearchInput from "@/modules/components/RiderSearchInput";
import ShareYourRideCard from "@/modules/home/components/ShareYourRideCard";
import YourTripsSection from "@/modules/home/components/YourTripsSection";

export default function HomePage() {
  return (
    <TopLayout>
      <RiderSearchInput />
      <ShareYourRideCard />
      <YourTripsSection />
    </TopLayout>
  );
}
