import { Readable } from 'node:stream'

class createNewTask extends Readable {

}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new createNewTask(),
})