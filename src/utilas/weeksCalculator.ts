export function weeksCalculator(userAge: number): number {
  return userAge * 52;
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
return  userAge * 365 + leapYears;
}