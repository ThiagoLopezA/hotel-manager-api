import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome() {
    return {
      message: 'Welcome to Hotel Manager API',
      info: 'Go to /docs to learn more',
    };
  }
}
