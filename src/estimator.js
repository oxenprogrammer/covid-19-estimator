import impact from './utils/impact';

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impact(data, 10),
  severeImpact: impact(data, 50)
}
|| {
  data,
  impact: {},
  severeImpact: {}
}
);


export default covid19ImpactEstimator;
