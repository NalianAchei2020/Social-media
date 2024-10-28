const { exec } = require('child_process');
const fs = require('fs');

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
    `git commit --amend --date="${getDateString(date)}" -m "${message}"`,
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
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 60 * 1000);
    const message = `add sum function ${i + 1}`;
    backDateCommit(date, message);
    commits.push(message);
  }
  return commits;
}

module.exports = { createBackDatedCommits };
