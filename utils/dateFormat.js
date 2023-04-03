function dateFormat(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
}

module.exports = dateFormat;
