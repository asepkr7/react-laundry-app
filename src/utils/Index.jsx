export const codeTransaction = (billDate, orderNumber, customerId) => {
  const date = new Date(billDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);

  // Ambil 3 digit terakhir dari ID customer
  const customerIdSuffix = customerId.slice(-3); // Ambil 3 digit terakhir dari customerId

  return `TR-${day}${month}${year}-${customerIdSuffix}-${orderNumber}`;
};
