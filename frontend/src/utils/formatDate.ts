export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  if (days > 1) {
    return `${days} days ago at ${date.toLocaleTimeString("en-US", options)}`;
  } else if (days === 1) {
    return `yesterday at ${date.toLocaleTimeString("en-US", options)}`;
  } else {
    return `today at ${date.toLocaleTimeString("en-US", options)}`;
  }
};
