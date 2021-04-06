"use strict";

const data = require("./data.json");

function randomDate(start, end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(array) {
  return array[randomInt(array.length - 1)];
}

function randomSentence(max) {
  return [...Array(randomInt(max, 5)).keys()].map(() => randomElement(data.word)).join(" ");
}

module.exports = {
  up: async (queryInterface) => {
    const users = [];

    // Users
    [...Array(300).keys()].forEach((el) => {
      const id = el + 1;
      const phone = "+84" + randomInt(999999999, 100000000);
      const name = randomElement(data.buffer) + " " + randomElement(data.name);
      const sex = randomInt(4, 1);
      const dob = randomDate(new Date(1960, 0, 1), new Date(2016, 0, 1));
      const description = randomSentence(10);
      users.push({ id, phone, name, sex, dob, description });
    });

    const seeder = {
      users,
    };

    for (const table in seeder) {
      console.log(`Start seed ${table} with ${seeder[table].length} column`);
      try {
        while (seeder[table].length > 1) {
          const seed = seeder[table].splice(0, 10000);
          await queryInterface.bulkInsert(table, seed);
        }
        console.log(`Complete seed ${table}`);
      } catch (error) {
        console.log(error.message);
        console.log(error.stack);
      }
    }
  },

  down: async () => {},
};
