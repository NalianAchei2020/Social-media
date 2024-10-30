const { generateCommits } = require('./functions');

const main = async () => {
  try {
    await generateCommits(200);
    console.log('Commit generation completed successfully');
  } catch (error) {
    console.error('Error generating commits:', error);
    process.exit(1);
  }
};

main();
