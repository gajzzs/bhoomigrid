// Statutory RFCTLARR Act 2013 Compensation Calculator Engine

export interface CompensationInputs {
  areaHectares: number;
  baseCircleRatePerHa: number;
  isRural: boolean;
  distanceFromUrbanKm?: number;
  sec11DateStr: string;
  awardDateStr: string;
  structuresAndTreesValue: number;
}

export interface CompensationBreakdown {
  areaHectares: number;
  baseRatePerHa: number;
  baseMarketValue: number; // area * baseRate
  ruralMultiplier: number; // 1.0 to 2.0
  multipliedMarketValue: number; // baseMarketValue * multiplier
  solatiumPct: number; // 100%
  solatiumAmount: number; // 100% of multipliedMarketValue
  daysBetweenSec11AndAward: number;
  additionalMarketValueAnnualRate: number; // 12%
  additionalMarketValueAmount: number; // 12% * baseMarketValue * (days / 365)
  structuresAndAssets: number;
  totalAwardAmount: number;
  formattedTotalInCrores: string;
  formattedTotalInLakhs: string;
  formattedTotalInRupees: string;
}

/**
 * Calculates statutory compensation under First Schedule of RFCTLARR Act 2013
 */
export function calculateRFCTLARRCompensation(inputs: CompensationInputs): CompensationBreakdown {
  const {
    areaHectares,
    baseCircleRatePerHa,
    isRural,
    distanceFromUrbanKm = 0,
    sec11DateStr,
    awardDateStr,
    structuresAndTreesValue,
  } = inputs;

  // 1. Base Market Value (Section 26)
  const baseMarketValue = areaHectares * baseCircleRatePerHa;

  // 2. Rural Multiplier (First Schedule)
  // Distance-based multiplier: Urban = 1.0; Rural <10km = 1.25; 10-20km = 1.5; >20km = 2.0
  let ruralMultiplier = 1.0;
  if (isRural) {
    if (distanceFromUrbanKm >= 20) {
      ruralMultiplier = 2.0;
    } else if (distanceFromUrbanKm >= 10) {
      ruralMultiplier = 1.5;
    } else if (distanceFromUrbanKm > 0) {
      ruralMultiplier = 1.25;
    } else {
      ruralMultiplier = 1.5; // Default standard rural factor
    }
  }

  const multipliedMarketValue = baseMarketValue * ruralMultiplier;

  // 3. Solatium: Section 30(1) - 100% of market value
  const solatiumAmount = multipliedMarketValue * 1.0;

  // 4. Additional Market Value (Section 30(3)): 12% per annum from Sec 11 to Award date
  const sec11Date = new Date(sec11DateStr);
  const awardDate = new Date(awardDateStr);
  const diffTime = Math.max(0, awardDate.getTime() - sec11Date.getTime());
  const daysBetween = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const yearsFraction = daysBetween / 365.25;

  const additionalMarketValueAmount = baseMarketValue * 0.12 * yearsFraction;

  // 5. Total Statutory Award (Section 27 & 30)
  const totalAwardAmount = Math.round(
    multipliedMarketValue +
    solatiumAmount +
    additionalMarketValueAmount +
    structuresAndTreesValue
  );

  return {
    areaHectares,
    baseRatePerHa: baseCircleRatePerHa,
    baseMarketValue: Math.round(baseMarketValue),
    ruralMultiplier,
    multipliedMarketValue: Math.round(multipliedMarketValue),
    solatiumPct: 100,
    solatiumAmount: Math.round(solatiumAmount),
    daysBetweenSec11AndAward: daysBetween,
    additionalMarketValueAnnualRate: 12,
    additionalMarketValueAmount: Math.round(additionalMarketValueAmount),
    structuresAndAssets: Math.round(structuresAndTreesValue),
    totalAwardAmount,
    formattedTotalInCrores: `₹ ${(totalAwardAmount / 10000000).toFixed(2)} Cr`,
    formattedTotalInLakhs: `₹ ${(totalAwardAmount / 100000).toFixed(2)} Lakh`,
    formattedTotalInRupees: `₹ ${totalAwardAmount.toLocaleString('en-IN')}`,
  };
}

/**
 * Format currency in Indian Numbering System (Crores / Lakhs / Thousands)
 */
export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${amount.toLocaleString('en-IN')}`;
}
