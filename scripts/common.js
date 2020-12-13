const {exec} = require('child_process');

/*
 * 
 * Runs Installation of build / dev deps 
 *
 * **/
async function runDevInstall() {
    return new Promise((resolve, reject) => {
        exec('yarn install', (err, stdout, stderr) => {
            if (err) return reject(err);
            return resolve(stdout);
        });
    });
}

/*
 * 
 * Runs Installation of production deps 
 *
 * **/
async function runProductionInstall() {
    return new Promise((resolve, reject) => {
        exec('yarn install --frozen-lockfile --production', (err, stdout, stderr) => {
            if (err) return reject(err);
            return resolve(stdout);
        });
    });
}
/*
 *
 * 
 * Cleans the dist folder 
 *
 * **/
async function runClean() {
    console.log('Running clean');
    return new Promise((resolve, reject) => {
        exec('yarn run clean', (err, stdout, stderr) => {
            if (err) return reject(err);
            return resolve(stdout);
        });
    });
}


/*
 * 
 * Runs the build to create new dist scripts
 *
 * **/
async function runBuild() {
    return new Promise((resolve, reject) => {
        exec('yarn run build', (err, stdout, stderr) => {
            if (err) return reject(err);
            return resolve(stdout);
        });
    });
}

module.exports = {
    runClean,
    runBuild,
    runDevInstall,
    runProductionInstall
};
