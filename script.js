const { exec } = require('child_process');
import commitMessages from './commitMessages.js';

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-07-28');
const commitCountPerDay = 200;

const generateCommits = () => {
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    for (let i = 0; i < commitCountPerDay; i++) {
      const commitMessage = commitMessages[i % commitMessages.length];
      const commitDate = new Date(currentDate);
      commitDate.setHours(0, 0, 0, 0); // Set to midnight

      // Updated command: date comes before the message
      const command = `git commit --date="${commitDate.toISOString()}" -m "${commitMessage}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing commit: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Error in commit: ${stderr}`);
          return;
        }
        console.log(`Commit successful: ${stdout}`);
      });
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
};

generateCommits();
