const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const commitMessages = require('./commitMessages'); // Make sure this file exists and contains your commit messages

// Initialize Git
const git = simpleGit();

// Define the date range from January 1st to July 28th
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-07-28');
const totalDays = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000)); // Calculate total days between the two dates

// Function to create a random file
function createRandomFile(index) {
  const filename = `file_${index}.txt`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, `This is file number ${index}`, 'utf8');
  return filename;
}

// Function to commit with a backdated date
async function commitWithBackdate(filename, message, daysAgo) {
  const commitDate = new Date(startDate);
  commitDate.setDate(commitDate.getDate() + daysAgo); // Calculate the exact commit date
  await git.add(filename);
  await git.commit(message, {
    '--date': commitDate.toISOString(),
  });
}

// Function to create files, commit, and push backdated commits
async function makeBackdatedCommits() {
  const numberOfCommits = 200; // Total number of commits
  const commitsPerDay = Math.ceil(numberOfCommits / totalDays); // Calculate how many commits per day

  let commitCount = 0;

  // Loop through each day between the start and end dates
  for (let i = 0; i < totalDays; i++) {
    // For each day, create the required number of commits
    for (let j = 0; j < commitsPerDay && commitCount < numberOfCommits; j++) {
      const filename = createRandomFile(commitCount);
      const message = commitMessages[commitCount % commitMessages.length]; // Cycle through commit messages

      // Commit the file with a backdated date
      await commitWithBackdate(filename, message, i);

      commitCount++;
      console.log(
        `Committed: ${message} - Date: ${new Date(
          startDate.getTime() + i * 24 * 60 * 60 * 1000
        ).toISOString()}`
      );
    }
  }

  // Push the commits to the remote repository
  await git.push('origin', 'main');
}

// Start the process
makeBackdatedCommits();
