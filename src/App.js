import ConvenienceController from './controllers/Convenience.controller.js';

class App {
  async run() {
    const convenienceController = new ConvenienceController();
    await convenienceController.start();
  }
}

export default App;
