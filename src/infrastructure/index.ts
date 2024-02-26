import fs from 'fs';

import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('test.pdf');

console.time();
pdf(dataBuffer).then(function(data: pdf.Result) {
    console.log(data.text);
    console.timeEnd();
});


const users = [
    { name: 'Oby', age: 12 },
    { name: 'Heera', age: 32 },
];

const loggedInUser = users.find((u) => u.name === 'loggedInUsername');
if (loggedInUser) console.log(loggedInUser.age);

