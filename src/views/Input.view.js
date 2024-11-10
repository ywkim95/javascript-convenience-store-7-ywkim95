import io from '../utils/io.js';
import INPUT_MESSAGE from '../utils/input-message.js';
import OutputView from './Output.view.js';
import Validate from '../utils/Validate.js';

const InputView = {
  async readProducts() {
    while(true) {
      try {
        const input = await io.readInput(INPUT_MESSAGE.PURCHASE);
        Validate.validateProductInput(input);
        return input;
      } catch(e) {
        OutputView.printError(e);
      }
    }
  },
  async addPromotion(name) {
    while(true) {
      try {
        const input = await io.readInput(INPUT_MESSAGE.ADD_PROMOTION(name));
        Validate.validateYN(input);
        return input;
      }catch (e) {
        OutputView.printError(e);
      }
    }
  },
  async nonPromotion(name, quantity) {
    while(true) {
      try {
        const input = await io.readInput(INPUT_MESSAGE.NON_PROMOTION(name, quantity));
        Validate.validateYN(input);
        return input;
      }catch (e) {
        OutputView.printError(e);
      }
    }
  },
  async membership() {
    while(true) {
      try {
        const input = await io.readInput(INPUT_MESSAGE.MEMBERSHIP);
        Validate.validateYN(input);
        return input
      }catch (e) {
        OutputView.printError(e);
      }
    }
  },
  async purchaseAgain() {
    while(true) {
      try {
        const input = await io.readInput(INPUT_MESSAGE.PURCHASE_AGAIN);
        Validate.validateYN(input);
        return input;
      } catch(e) {
        OutputView.printError(e);
      }
    }
  }
}

export default InputView;