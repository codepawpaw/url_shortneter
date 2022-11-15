class Logger {
    info(message) {
      let output = {
        level: 'info',
        message
      };
      console.log(output);
    }
  
    error(message) {
      let output = {
        level: 'error',
        message
      };
      console.log(output);
    }
}
  
module.exports = new Logger();
  