/**
 * Генерує випадкове ціле число між заданими межами (включно).
 * @param min Мінімальне значення.
 * @param max Максимальне значення.
 * @returns Випадкове ціле число.
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Випадковим чином вирішує, чи повинна подія відбутися, враховуючи задану ймовірність.
 * @param probability Ймовірність від 0 до 1.
 * @returns true, якщо подія відбувається.
 */
export function randomChance(probability: number): boolean {
    return Math.random() < probability;
}

/**
 * Вибирає випадковий елемент з масиву.
 * @param array Масив елементів.
 * @returns Випадковий елемент масиву.
 */
export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
