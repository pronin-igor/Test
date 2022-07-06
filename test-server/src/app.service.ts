import { Injectable } from '@nestjs/common';
import * as CSVToJSON from 'csvtojson';
import * as fs from 'fs';
const filename = 'example.csv';

@Injectable()
export class AppService {
  users = [];

  constructor() {
    CSVToJSON()
      .fromFile(filename)
      .then((data) => {
        this.users = data;
        console.log('конструктор');
        console.log(this.users);
      });

    fs.watchFile(filename, (curr, prev) => {
      CSVToJSON()
        .fromFile(filename)
        .then((data) => {
          this.users = data;
          console.log('watch');
          console.log(this.users);
        });
    });
  }

  getData(): any[] {
    console.log('getData');
    console.log(this.users);
    return this.users;
  }
}
