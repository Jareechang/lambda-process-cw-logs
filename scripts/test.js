const {exec} = require('child_process');
const chalk = require('chalk');

async function runTsCheck() {
    console.log('Running ts check');
    return new Promise((resolve, reject) => {
        const cmd = exec('yarn run ts-check', (err, stdout, stderr) => {
            if (err) return reject(err);
            return resolve(stdout);
        });

        cmd.stdout.on('data', (data) => {
            console.log(chalk`{white.bgBlue [Build - Step, TS check]} ${data}`);
        })
    });
}

runTsCheck()
