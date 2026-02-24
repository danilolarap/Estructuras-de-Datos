// ==========================
// GENERIC QUEUE IMPLEMENTATION
// ==========================
var Queue = /** @class */ (function () {
    function Queue() {
        this.items = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.items.shift();
    };
    Queue.prototype.front = function () {
        return this.items[0];
    };
    Queue.prototype.size = function () {
        return this.items.length;
    };
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Queue;
}());
// ==========================
// ENEMY CLASS
// ==========================
var Enemy = /** @class */ (function () {
    function Enemy(id, type, health) {
        this.id = id;
        this.type = type;
        this.health = health;
    }
    Enemy.prototype.getInfo = function () {
        return "Enemy #".concat(this.id, " | Type: ").concat(this.type, " | HP: ").concat(this.health);
    };
    return Enemy;
}());
// ==========================
// SPAWN MANAGER
// ==========================
var SpawnManager = /** @class */ (function () {
    function SpawnManager() {
        this.spawnQueue = new Queue();
        this.activeEnemies = [];
        this.enemyCounter = 0;
    }
    SpawnManager.prototype.scheduleEnemy = function (type, health) {
        this.enemyCounter++;
        var enemy = new Enemy(this.enemyCounter, type, health);
        this.spawnQueue.enqueue(enemy);
        console.log("Scheduled for spawn: ".concat(enemy.getInfo()));
    };
    SpawnManager.prototype.spawnNextEnemy = function () {
        if (!this.spawnQueue.isEmpty()) {
            var enemy = this.spawnQueue.dequeue();
            if (enemy) {
                this.activeEnemies.push(enemy);
                console.log("Spawned: ".concat(enemy.getInfo()));
            }
        }
        else {
            console.log("No enemies waiting to spawn.");
        }
    };
    SpawnManager.prototype.showSpawnQueue = function () {
        console.log("Enemies waiting to spawn: ".concat(this.spawnQueue.size()));
    };
    SpawnManager.prototype.showActiveEnemies = function () {
        console.log("\nActive Enemies:");
        if (this.activeEnemies.length === 0) {
            console.log("No active enemies.");
        }
        else {
            this.activeEnemies.forEach(function (enemy) {
                return console.log(enemy.getInfo());
            });
        }
    };
    return SpawnManager;
}());
// ==========================
// SIMULATION
// ==========================
var spawnSystem = new SpawnManager();
console.log("\n--- Scheduling Wave 1 ---");
spawnSystem.scheduleEnemy("Zombie", 100);
spawnSystem.scheduleEnemy("Skeleton", 80);
spawnSystem.scheduleEnemy("Orc", 150);
spawnSystem.showSpawnQueue();
console.log("\n--- Spawning Enemies ---");
spawnSystem.spawnNextEnemy();
spawnSystem.spawnNextEnemy();
spawnSystem.showSpawnQueue();
spawnSystem.showActiveEnemies();
console.log("\n--- Spawning Remaining Enemy ---");
spawnSystem.spawnNextEnemy();
spawnSystem.showSpawnQueue();
spawnSystem.showActiveEnemies();
