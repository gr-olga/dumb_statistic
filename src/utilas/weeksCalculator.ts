export function getCurrentYearWeek(): number {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
  const dayOfYear =
    Math.floor(
      (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;
  return Math.ceil(dayOfYear / 7);
}

export function weeksCalculator(birthDate: number, currentDate: Date): number {
  const oneWeek = 1000 * 60 * 60 * 24 * 7; // Milliseconds in a week
  return Math.floor((currentDate.getTime() - birthDate) / oneWeek);
}

export function monthsCalculator(userAge: number): number {
  return userAge * 12;
}

export function weekendsCalculator(userAge: number): number {
  return userAge * 52 * 2;
}

function countLeapYears(year: number): number {
  return Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);
}

export function daysCalculator(userAge: number): number {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - userAge;
  const leapYears = countLeapYears(birthYear);
  return userAge * 365 + leapYears;
}
