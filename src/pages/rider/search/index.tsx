import RiderSearchBar from "@/modules/components/RiderSearchBar";
import NestedLayout from "@/modules/layouts/Nested";
import { useRouter } from "next/router";

export default function SearchPage() {
  const router = useRouter();

  return (
    <NestedLayout
      title="Search"
      backButtonCallback={() => router.push("/home")}
    >
      <RiderSearchBar />
    </NestedLayout>
  );
}
