import { Box, Button, Toast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NestedLayout from "@/modules/layouts/Nested";
import SavedVehicle from "@/modules/settings/components/SavedVehicle";
import { useUser } from "@/modules/api/swr/useUser";
import { authFetcher } from "@/modules/api/fetcher";

export default function SettingsPage() {
  const { user } = useUser();
  const [vehicle, setVehicle] = useState<Vehicle>({
    carType: user?.carType || "",
    carPlate: user?.carPlate || "",
  });

  useEffect(() => {
    if (user) {
      setVehicle({
        carType: user?.carType || "",
        carPlate: user?.carPlate || "",
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    console.log(
      JSON.stringify({
        carType: vehicle.carType,
        carPlate: vehicle.carPlate,
      })
    );
    const res = await authFetcher(`/user/${encodeURIComponent(user?.id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carType: vehicle.carType,
        carPlate: vehicle.carPlate,
      }),
    });

    if (!res.OK) {
      // toast
      return Toast({
        title: "Error",
        description: "Update failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return Toast({
        title: "Success",
        description: "Update successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <NestedLayout title="Settings">
      <Box margin="20px">
        <SavedVehicle vehicle={vehicle} setVehicle={setVehicle} />
        <Button width={"full"} onClick={handleUpdate}>
          Confirm
        </Button>
      </Box>
    </NestedLayout>
  );
}
