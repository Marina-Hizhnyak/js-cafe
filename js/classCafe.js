import menu from './db/menu.js';
import tables from './db/tables.js';
import workers from './db/workers.js';


// 1. Написать функцию, которая из списка официантов(массив объектов) выбрает официантов,
// которые  есть на смене по свойству isPresent: true; и записывает их всех в массив, который 
// хранится в переменной presentWorkers = []. 
// Пример: 
// concole.log(presentWorkers); // [{name: "Ann", isPresent: true, tables: [], tips: 0}, {name: "Bob", isPresent: true, tables: [], tips: 0}]
// 
// 
class Cafe {
    constructor({ menu, tables, workers }) {
        this.menu = menu;
        this.tables = tables;
        this.workers = workers;
    };
    
    getPresentWorkers() {
        this.presentWorkers = [];
        for (const worker of this.workers) {
            if (worker.isPresent === true) {
                this.presentWorkers.push(worker);
            }
        }
    };
    checkTables() {
        this.getPresentWorkers();
        for (let i = 0; i < this.tables.length; i++) {
            const workerIndex = i % this.presentWorkers.length;
            this.tables[i].service = this.presentWorkers[workerIndex].name;
            this.presentWorkers[workerIndex].tables.push(this.tables[i].table)
        }
    };
    getOrder(tableNum, dishId, quantity) {
        const curTable = this.findTable(tableNum);
        curTable.currentOrder = { dishId: quantity}
        console.log(curTable);
    };

    findTable(tableNum) {
        for (const table of tables) {
            if (tableNum === table.table) {
                return table;
            }
        }
    }
}
const cafeArgs = { menu, tables, workers,};
const cafe = new Cafe(cafeArgs);
console.log(cafe);

cafe.getPresentWorkers();
cafe.checkTables();
cafe.findTable();
cafe.getOrder();
console.log(cafe);

console.log(cafe.presentWorkers);


// 2. Написать ф-цию, которая принимает два параметра (список столиков, список официантов на смене) распределяет все столики в кафе - tables, 
// между всеми официантами, которые есть на смене и перезаписывает в свойство каждому столику, имя оффицианта, который его обслуживает,
// и оффицианту, в свою очередь, в сойство tabeles, перезаписывает все номера столиков, которые он обслуживает 
// на этой смене - функция ничего не возвращает, а перезаписывает объекты в массивах
// Пример:
// console.log(presentWorkers); // [{name: "Ann", isPresent: true, tables: [1, 3, 6, 7], tips: 0}, {name: "Bob", isPresent: true, tables: [2, 4, 5, 8], tips: 0}]
// console.log(tables); // [{tabel: 1, service: "Ann"}, {tabel: 2, service: "Bob"}, {tabel: 3, service: "Ann"}, ... ]
// 
// // 3. Написать функцию getOrder(table, dishId, num), коорая принимает номер столика, id блюда(меню с блюдами внешняя переменная из глобальной области видимости) и кол-во данных блюд в заказе. добавляет в объекте столика, свойство currentOrder - объект со свойствами, где ключ - id блюда, значение ключа - кол-во этих блюд в текущем заказе, Пример currentOrder: {capuchino: 2, napoleon: 2, zavarnoe: 1}, 
// 
// 
