// ===============================
// GENERIC QUEUE IMPLEMENTATION
// ===============================

class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    getItems(): T[] {
        return this.items;
    }
}

// ===============================
// ENEMY CLASS
// ===============================

class Enemy {
    constructor(
        public id: number,
        public type: string,
        public health: number
    ) {}

    getInfo(): string {
        return `Enemy #${this.id} | Type: ${this.type} | HP: ${this.health}`;
    }
}

// ===============================
// SPAWN MANAGER
// ===============================

class SpawnManager {
    private spawnQueue: Queue<Enemy> = new Queue();
    private activeEnemies: Enemy[] = [];
    private enemyCounter: number = 0;

    private enemyTypes = ["Zombie", "Skeleton", "Orc", "Demon", "Goblin", "Vampire"];

    // Generate random number in range
    private randomBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Create random enemy
    private createRandomEnemy(): Enemy {
        const type = this.enemyTypes[this.randomBetween(0, this.enemyTypes.length - 1)];
        const health = this.randomBetween(50, 200);
        this.enemyCounter++;
        return new Enemy(this.enemyCounter, type, health);
    }

    // Generate random wave
    generateWave(): void {
        const amount = this.randomBetween(2, 6);

        console.log(`\n--- Generating Random Wave (${amount} enemies) ---`);

        for (let i = 0; i < amount; i++) {
            const enemy = this.createRandomEnemy();
            this.spawnQueue.enqueue(enemy);
            console.log("Queued:", enemy.getInfo());
        }

        console.log(`Enemies waiting to spawn: ${this.spawnQueue.size()}`);
    }

    spawnAll(): void {
        console.log("\n--- Spawning Enemies ---");

        while (!this.spawnQueue.isEmpty()) {
            const enemy = this.spawnQueue.dequeue();
            if (enemy) {
                this.activeEnemies.push(enemy);
                console.log("Spawned:", enemy.getInfo());
            }
        }

        console.log("\nActive Enemies:");
        this.activeEnemies.forEach(enemy => {
            console.log(enemy.getInfo());
        });
    }
}

// ===============================
// SIMULATION
// ===============================

const spawnSystem = new SpawnManager();

spawnSystem.generateWave();
spawnSystem.spawnAll();