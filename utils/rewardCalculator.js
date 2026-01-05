export const calculateReward = ({
  type,
  baseReward = 1,
  count = 1,
}) => {
  switch (type) {
    case 'charity':
      return baseReward * 700;

    case 'dhikr':
      return baseReward * count;

    default:
      return baseReward;
  }
};
