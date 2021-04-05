import format from 'date-fns/format';

export const stringToDateLocalString = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const stringToDateMoreDetail = (date: string) => {
  const d = new Date(date);
  return format(d, 'MMM dd, yyyy');
};
