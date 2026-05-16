const knapsack = (tasks, hours) => {
    const n = tasks.length;

    // Create DP table
    const dp = Array(n + 1)
        .fill()
        .map(() => Array(hours + 1).fill(0));

    // Fill DP table
    for (let i = 1; i <= n; i++) {
        const duration = tasks[i - 1].Duration;
        const impact = tasks[i - 1].Impact;

        for (let h = 0; h <= hours; h++) {
            if (duration <= h) {
                dp[i][h] = Math.max(
                    impact + dp[i - 1][h - duration],
                    dp[i - 1][h]
                );
            } else {
                dp[i][h] = dp[i - 1][h];
            }
        }
    }

    // Backtrack to find selected tasks
    let selected = [];
    let h = hours;

    for (let i = n; i > 0; i--) {
        if (dp[i][h] !== dp[i - 1][h]) {
            selected.push(tasks[i - 1]);
            h -= tasks[i - 1].Duration;
        }
    }

    return {
        maxImpact: dp[n][hours],
        selectedTasks: selected
    };
};

module.exports = {
    knapsack
};
