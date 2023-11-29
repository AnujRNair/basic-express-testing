function testing(str: string): void {
  console.log(str);
}

document.body.innerHTML = 'This is a test';

import('./async').then(module => module.anotherTest());

testing('Hello');
