export const getPublicationsWord = (count: number) => {
  const lastTwoDigits = count % 100;

  if (lastTwoDigits === 11 && lastTwoDigits <= 14) {
    return "публикаций";
  }

  const lastDigit = count % 10;

  switch (lastDigit % 10) {
    case 1:
      return "публикация";
    case 2:
    case 3:
    case 4:
      return "публикации";
    default:
      return "публикаций";
  }
};
