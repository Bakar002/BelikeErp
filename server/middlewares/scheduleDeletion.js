// utils/scheduleDeletion.js
const cron = require('node-cron');
const Task = require('../models/Task');

// Schedule a cron job to run every minute
cron.schedule('* * * * *', async () => {
    const now = new Date();
    try {
        // Find tasks that are past their deletion time
        const tasksToDelete = await Task.find({ time: { $lte: now } });
        
        if (tasksToDelete.length > 0) {
            // Delete tasks
            for (const task of tasksToDelete) {
                await Task.findByIdAndDelete(task._id);
            }
            console.log(`${tasksToDelete.length} tasks deleted.`);
        }
    } catch (error) {
        console.error('Error deleting tasks:', error.message);
    }
});

module.exports = (taskId, deletionTime) => {
    const now = new Date();
    const delay = deletionTime - now;

    // Schedule a deletion after the specified delay
    setTimeout(async () => {
        try {
            await Task.findByIdAndDelete(taskId);
            console.log(`Task with ID ${taskId} deleted.`);
        } catch (error) {
            console.error(`Error deleting task with ID ${taskId}:`, error.message);
        }
    }, delay);
};
