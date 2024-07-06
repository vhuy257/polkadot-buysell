import moment from "moment";

export const formatCurrency = (amount?: number) => {
  if (!amount) return;

  return new Intl.NumberFormat("en-US").format(amount);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return;

  return moment(dateString).utc().format("DD/MM/YYYY");
};
