const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const commitMessages = require('./commitMessages');

// Initialize Git
const git = simpleGit();

function createRandomFile(index) {
  const filename = `file_${index}.txt`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, `This is file number ${index}`, 'utf8');
  return filename;
}

// Function to commit with a backdated date
async function commitWithBackdate(filename, message, daysAgo) {
  await git.add(filename);
  await git.commit(message, {
    '--date': new Date(
      Date.now() - daysAgo * 24 * 60 * 60 * 1000
    ).toISOString(),
  });
}

// Function to create files, commit, and push backdated commits
async function makeBackdatedCommits() {
  for (let i = 0; i < 200; i++) {
    const filename = createRandomFile(i);
    const message = commitMessages[i % commitMessages.length]; // Cycle through commit messages
    const daysAgo = Math.floor(i / 10); // Change this to backdate the commit over several days

    await commitWithBackdate(filename, message, daysAgo);

    console.log(`Committed: ${message} - Days ago: ${daysAgo}`);
  }

  // Push the commits
  await git.push('origin', 'main');
}

// Start the process
makeBackdatedCommits();
