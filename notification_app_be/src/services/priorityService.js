const apiClient = require("../config/apiClient");
const Log = require("../utils/logger");

const TYPE_WEIGHT = {
    Placement: 3,
    Result: 2,
    Event: 1
};

class MinHeap {
    constructor(compare) {
        this.items = [];
        this.compare = compare;
    }

    size() {
        return this.items.length;
    }

    peek() {
        return this.items[0];
    }

    push(value) {
        this.items.push(value);
        this.bubbleUp(this.items.length - 1);
    }

    pop() {
        if (this.items.length === 1) return this.items.pop();
        const root = this.items[0];
        this.items[0] = this.items.pop();
        this.bubbleDown(0);
        return root;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.items[parent], this.items[index]) <= 0) break;
            [this.items[parent], this.items[index]] = [this.items[index], this.items[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        const n = this.items.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < n && this.compare(this.items[left], this.items[smallest]) < 0) {
                smallest = left;
            }
            if (right < n && this.compare(this.items[right], this.items[smallest]) < 0) {
                smallest = right;
            }
            if (smallest === index) break;

            [this.items[index], this.items[smallest]] = [this.items[smallest], this.items[index]];
            index = smallest;
        }
    }
}

const compareNotifications = (a, b) => {
    const weightDiff = (TYPE_WEIGHT[a.Type] || 0) - (TYPE_WEIGHT[b.Type] || 0);

    if (weightDiff !== 0) {
        return weightDiff;
    }

    const timeDiff = new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime();
    if (timeDiff !== 0) {
        return timeDiff;
    }

    return String(a.ID).localeCompare(String(b.ID));
};

const getTopTenNotifications = async () => {
    await Log("backend", "info", "service", "Fetching notifications from evaluation API");
    const response = await apiClient.get("/notifications");
    const notifications = response.data.notifications || [];

    await Log("backend", "info", "service", `Fetched ${notifications.length} notifications`);

    const heap = new MinHeap(compareNotifications);

    for (const notification of notifications) {
        const candidate = { ...notification };

        if (heap.size() < 10) {
            heap.push(candidate);
        } else if (compareNotifications(candidate, heap.peek()) > 0) {
            heap.pop();
            heap.push(candidate);
        }
    }

    const top = [];
    while (heap.size() > 0) {
        top.push(heap.pop());
    }

    top.reverse();

    await Log("backend", "info", "service", `Prepared top ${top.length} notifications`);

    return top;
};

module.exports = {
    getTopTenNotifications
};
