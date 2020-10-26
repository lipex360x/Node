import * as L from 'tracer';
const logger = L.console({
  format: '[{{file}} line: {{line}}] {{message}} ',
});

export default logger;
