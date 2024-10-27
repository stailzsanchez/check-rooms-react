import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatLastCheckDate = (dateString) => {
  if (!dateString) return '-';

  const lastCheckDate = new Date(dateString);

  if (isToday(lastCheckDate)) {
    return `Сегодня, ${format(lastCheckDate, 'HH:mm')}`;
  } else if (isYesterday(lastCheckDate)) {
    return `Вчера, ${format(lastCheckDate, 'HH:mm')}`;
  } else {
    return formatDistanceToNow(lastCheckDate, { addSuffix: true, locale: ru });
  }
};
