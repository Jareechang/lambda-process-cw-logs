const packageJson = require('../package.json');
const {exec} = require('child_process');
const fs = require('fs').promises;
const common = require('./common');

/*
 * 
 * Generate a versioned zip file based on the package json
 *
 * **/
async function generateLambdaS3ZipFile() {
    const fileName = `deploy/${packageJson.name}-${packageJson.version}.zip`;
    console.log(`Creating new zip file... ${fileName}`);
    return new Promise((resolve, reject) => {
        exec(`zip -r -q ${fileName} dist/ node_modules/`, (err, stdout, stderr) => {
            if (err) return reject(err);
            if (stdout) {
                console.log(`File created. name: ${fileName}`);
                return resolve(stdout);
            }
        });
    });
}

async function main() {
    try {
        // Run build 
        await common.runBuild();

        if (process.env.CI) {
            // Run production install, trim dev / build deps 
            await common.runProductionInstall();
        }

        // Create new dist folder
        await fs.mkdir('deploy');

        // Generate 
        await generateLambdaS3ZipFile();
    } catch (ex) {
        console.log(
            'version-lambda > main() failed. error:  ', ex);
        throw ex;
    }
}

main();
