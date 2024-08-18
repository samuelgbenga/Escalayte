
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const timeDiff = today - date;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      return "Today";
    } else if (daysDiff === 1) {
      return "1 day ago";
    } else {
      return `${daysDiff} days ago`;
    }
  };

  export const newFormatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = now - date;
  
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysDiff > 0) {
      if (daysDiff === 1) {
        return "1 day ago";
      } else {
        return `${daysDiff} days ago`;
      }
    } else if (hoursDiff > 0) {
      if (hoursDiff === 1) {
        return "1 hour ago";
      } else {
        return `${hoursDiff} hours ago`;
      }
    } else if (minutesDiff > 0) {
      if (minutesDiff === 1) {
        return "1 minute ago";
      } else {
        return `${minutesDiff} minutes ago`;
      }
    } else {
      return "Just now";
    }
  };
  