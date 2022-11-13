import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import NotificationThumbnail from "../notifications/notificationThumbnail";

function NotificationsVeiw() {
  return (
    <Box w="80vw">
      <Heading size="lg" color="secondary">Notifications</Heading>
      <Text>You don't have any notifications yet.</Text>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <>
          <NotificationThumbnail key={i} />
          <Divider color="secondary" border="1px solid primary" />
        </>
      ))}
    </Box>
  );
}

export default NotificationsVeiw;
