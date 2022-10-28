import { Box, Divider, Text } from "@chakra-ui/react";
import NotificationThumbnail from "../notifications/notificationThumbnail";

function NotificationsVeiw() {
  return (
    <>
      <Box ml={6}>
        <Text>You don't have any notifications yet.</Text>
      </Box>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <>
          <NotificationThumbnail key={i} />
          <Divider color="secondary" border="1px solid primary" />
        </>
      ))}
    </>
  );
}

export default NotificationsVeiw;
