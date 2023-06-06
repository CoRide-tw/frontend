import RiderSearchInput from "@/modules/components/RiderSearchBar";
import NestedLayout from "@/modules/layouts/Nested";

export default function SearchPage() {
  return (
    <NestedLayout title="Search">
      <RiderSearchInput />
    </NestedLayout>
  );
}
