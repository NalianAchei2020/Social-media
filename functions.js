const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const commitMessages = [
  'Add user authentication system',
  'Implement password hashing',
  'Update API documentation',
  'Fix user registration bug',
  'Add email verification',
  'Optimize database queries',
  'Implement rate limiting',
  'Add input validation',
  'Update security headers',
  'Fix CORS configuration',
  'Add error logging',
  'Implement caching layer',
  'Update dependencies',
  'Add unit tests',
  'Implement API versioning',
  'Add request validation',
  'Optimize performance',
  'Fix memory leak',
  'Add health check endpoint',
  'Update error handling',
  'Add integration tests',
  'Implement monitoring',
  'Add metrics collection',
  'Update CI/CD pipeline',
  'Fix security vulnerability',
  'Add data encryption',
  'Implement backup system',
  'Update logging system',
  'Add load balancing',
  'Fix connection pooling',
];

const generateRandomCommit = () => {
  const baseMessages = commitMessages.map((msg) => ({
    type: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'][
      Math.floor(Math.random() * 7)
    ],
    message: msg,
  }));

  return baseMessages.map(({ type, message }) => `${type}: ${message}`);
};

const createRandomFile = async (index) => {
  const fileName = `temp-${index}.txt`;
  const content = `Temporary file ${index} - ${new Date().toISOString()}`;

  await fs.promises.writeFile(fileName, content);
  return fileName;
};

const getRandomDate = (startDate, endDate) => {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
};

const generateCommits = async (numberOfCommits = 200) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 1); // 1 day ago

  const commits = generateRandomCommit();

  for (let i = 0; i < numberOfCommits; i++) {
    try {
      // Create a random file
      const fileName = await createRandomFile(i);

      // Generate random date
      const date = getRandomDate(startDate, endDate);
      const dateString = date.toISOString();

      // Stage, commit with backdated timestamp, and cleanup
      await execAsync(`git add ${fileName}`);
      await execAsync(
        `GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m "${
          commits[i % commits.length]
        }"`
      );
      await fs.promises.unlink(fileName);

      console.log(`Created commit ${i + 1}/${numberOfCommits}`);
    } catch (error) {
      console.error(`Error creating commit ${i + 1}:`, error);
    }
  }

  try {
    await execAsync('git push origin main --force');
    console.log('Successfully pushed all commits');
  } catch (error) {
    console.error('Error pushing commits:', error);
  }
};

module.exports = { generateCommits };
