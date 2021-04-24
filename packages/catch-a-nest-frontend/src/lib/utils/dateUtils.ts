import format from 'date-fns/format';

export const getDiffOfNow = (date: Date | string) => {
  let d: Date;
  if (typeof date === 'string') {
    d = new Date(date);
  } else {
    d = date;
  }
  const diff = Math.ceil(
    new Date().getTime() - d.getTime() / 24 / 60 / 60 / 60
  );
  const result = diff > 12 ? d.toDateString() : `About ${diff} ago`;
  return result;
};

export const stringToDateLocalString = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export const stringToDateMoreDetail = (date: string) => {
  const d = new Date(date);
  return format(d, 'MMM dd, yyyy');
};
