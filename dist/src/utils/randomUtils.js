"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomElement = exports.randomChance = exports.getRandomInt = void 0;
/**
 * Генерує випадкове ціле число між заданими межами (включно).
 * @param min Мінімальне значення.
 * @param max Максимальне значення.
 * @returns Випадкове ціле число.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
/**
 * Випадковим чином вирішує, чи повинна подія відбутися, враховуючи задану ймовірність.
 * @param probability Ймовірність від 0 до 1.
 * @returns true, якщо подія відбувається.
 */
function randomChance(probability) {
    return Math.random() < probability;
}
exports.randomChance = randomChance;
/**
 * Вибирає випадковий елемент з масиву.
 * @param array Масив елементів.
 * @returns Випадковий елемент масиву.
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomElement = getRandomElement;
