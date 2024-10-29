const { createBackDatedCommits } = require('./functions');

// Set the desired start date and number of commits
const startDate = new Date('2024-04-02T00:00:00');
const numCommits = 200;

// Create the backdated commits
const commits = createBackDatedCommits(startDate, numCommits);

// Print the list of created commits
console.log('Created the following backdated commits:');
commits.forEach((commit, index) => {
  console.log(`${index + 1}. ${commit}`);
});
