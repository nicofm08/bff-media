import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import * as chalk from 'chalk';

@Injectable()
export class AppLogger implements LoggerService {
  private context: string = 'AppLogger';
  private layer: string = '[INIT]';
  private logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
      format.printf(({ timestamp, level, message }) => {
        const color = level === 'info' ? chalk.green : level === 'error' ? chalk.red : chalk.yellow;
        return `${chalk.green(timestamp)} | ${color(level.toUpperCase())} | ${chalk.yellow(this.context)} | ${chalk.magenta(this.layer)} | ${chalk.cyan(message)}`;
      })
    ),
    transports: [new transports.Console()],
  });

  setContext(context: string, layer: string = '[INIT]') {
    this.context = context;
    this.layer = layer;
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
