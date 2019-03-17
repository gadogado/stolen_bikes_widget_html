import dayjs from 'dayjs';

const formatDate = str => {
  const date = dayjs.unix(str);
  const today = dayjs().startOf('day');
  const yesterday = dayjs().subtract(1, 'day').startOf('day');
  
  const formattedDate = date.isSame(today, 'day')
    ? 'Today'
    : date.isSame(yesterday, 'day')
      ? 'Yesterday'
      : date.format('MMM DD YYYY');
  
   return formattedDate;
}

export {
  formatDate
};
