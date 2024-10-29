const { exec } = require('child_process');
const commitMessages = require('./commitMessages');

function getDateString(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
}

function backDateCommit(date, message) {
  exec(
    `git commit --date="${getDateString(date)}" -m "${message}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`add sum function: ${message}`);
    }
  );
}

function createBackDatedCommits(startDate, count) {
  const commits = [];
  let index = 0;

  function createCommit() {
    if (index >= count) return; // Stop if count is reached

    const date = new Date(startDate.getTime() + index * 60 * 1000);
    const message = commitMessages[index % commitMessages.length];

    backDateCommit(date, message);
    commits.push(message);
    index++;

    // Add a delay of 1 second before the next commit
    setTimeout(createCommit, 1000); // 1000 ms = 1 second
  }

  createCommit(); // Start the commit process
  return commits;
}

module.exports = { createBackDatedCommits };
