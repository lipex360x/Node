class HelloController {
  async index(req, res) {
    req.io.emit('backend', 'Hello World');

    console.log('Hello World || app/controlers/HelloController.js');

    return res.json({ message: 'Hello World' });
  }
}

export default new HelloController();
