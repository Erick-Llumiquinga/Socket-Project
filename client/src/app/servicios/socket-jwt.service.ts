import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketJwtService extends Socket{

  constructor() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZXJpY2s0QGdtYWlsLmNvbSJ9LCJpYXQiOjE1OTM3OTE4OTMsImV4cCI6MTU5Mzc5MjEzM30.tmWtEYxXVQ2hYvQB2cZ9jNtX-PzvhewSe2CFLqXwtjU"
    super({url: 'http://localhost:3500', options: {
      query: `token=${token}`
    }})
   }
}
