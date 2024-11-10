import { MissionUtils } from '@woowacourse/mission-utils';

const readInput = async (message) => {
  return await MissionUtils.Console.readLineAsync(message);
};

const printOutput = (message) => {
  MissionUtils.Console.print(message);
};

export default {
  readInput,
  printOutput,
};
