export const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
    case "processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    case "shipped":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300";
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
