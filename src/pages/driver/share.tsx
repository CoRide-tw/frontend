import NestedLayout from "@/modules/layouts/Nested";
import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const FormGroupTitle = ({ children }: PropsWithChildren) => (
  <Box fontSize="18px" fontWeight="500">
    {children}
  </Box>
);

const TripPointsForm = ({ form }: { form: string }) => (
  <Flex gap="16px" direction="column">
    <FormGroupTitle>Your Trip</FormGroupTitle>
    <Input form={form} name="starting-point" placeholder="Starting point" />
    <Input form={form} name="destination" placeholder="Destination" />
  </Flex>
);

const current = new Date();
const anHourLater = new Date();
anHourLater.setHours((current.getHours() + 1) % 24);

const dateInputString = current.toLocaleDateString("fr-CA");
const currentTimeInputString = current.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const anHourLaterTimeInputString = anHourLater.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const WaitIntervalForm = ({ form }: { form: string }) => (
  <Flex gap="16px" direction="column">
    <FormGroupTitle>Waiting Interval</FormGroupTitle>
    <Input form={form} type="date" name="date" defaultValue={dateInputString} />
    <Flex direction="row" gap="16px">
      <Input
        form={form}
        type="time"
        name="time-start"
        defaultValue={currentTimeInputString}
      />
      <Flex align="center">~</Flex>
      <Input
        form={form}
        type="time"
        name="time-end"
        defaultValue={anHourLaterTimeInputString}
      />
    </Flex>
  </Flex>
);

const CoRideInfoForm = ({ form }: { form: string }) => (
  <Flex gap="16px" direction="column">
    <FormGroupTitle>Co-ride Info</FormGroupTitle>
    <Input
      form={form}
      type="number"
      name="passenger-number"
      placeholder="Passenger number"
    />
    <Textarea form={form} name="remark" placeholder="Remark" resize="none" />
  </Flex>
);

export default function ShareRide() {
  return (
    <NestedLayout title="Share Your Ride">
      <form method="post" action="/api/trip/share" id="trip-share-form">
        <Flex direction="column" gap="16px" mx="36px">
          <TripPointsForm form="trip-share-form" />
          <WaitIntervalForm form="trip-share-form" />
          <CoRideInfoForm form="trip-share-form" />
        </Flex>
        <Flex w="full" px="20px" py="32px">
          <Button form="trip-share-form" type="submit" flex="1">
            Confirm
          </Button>
        </Flex>
      </form>
    </NestedLayout>
  );
}
