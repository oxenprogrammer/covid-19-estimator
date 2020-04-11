const impact = (data, variant) => {
  const {
    periodType, reportedCases, timeToElapse, totalHospitalBeds,
    region: { avgDailyIncomeInUSD, avgDailyIncomePopulation } = {}
  } = data;
  let factor;
  let estimate;
  if (periodType.toLowerCase() === 'days') {
    estimate = timeToElapse;
    factor = Math.trunc(estimate / 3);
  }
  if (periodType.toLowerCase() === 'weeks') {
    estimate = timeToElapse * 7;
    factor = Math.trunc(estimate / 3);
  }
  if (periodType.toLowerCase() === 'months') {
    estimate = timeToElapse * 30;
    factor = Math.trunc(estimate / 3);
  }
  factor = 2 ** factor;
  const currentlyInfected = reportedCases * variant;
  const infectionsByRequestedTime = Math.trunc(currentlyInfected * factor);
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const bedsAvail = totalHospitalBeds * 0.35;
  const hospitalBedsByRequestedTime = Math.trunc(bedsAvail - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
  const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / estimate
  );
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

export default impact;
