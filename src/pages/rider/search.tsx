import RiderSearchInput from "@/modules/components/RiderSearchBar";
import NestedLayout from "@/modules/layouts/Nested";

export default function Search() {
  return (
    <NestedLayout title="Search">
      <RiderSearchInput />
    </NestedLayout>
  );
}
