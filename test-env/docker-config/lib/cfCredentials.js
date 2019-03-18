var exec = require('child_process').exec;
function execute(command) {
    return new Promise( (resolve,reject) =>
        exec(command, function (error, stdout, stderr) { 
            if (error)
                reject(error)
            else
                resolve(stdout); })
    );
};

async function getXsuaaEnv() {
    let output = await execute('cf service-key my-uaa run-local');
    lines = output.split('\n');
    lines.splice(0, 2);
    return JSON.parse(lines.join('\n'));
}
async function getPortalEnv() {
    let output = await execute('cf service-key my-portal-host run-local');
    lines = output.split('\n');
    lines.splice(0, 2);
    return JSON.parse(lines.join('\n'));
}

module.exports = {
    xsuaa: getXsuaaEnv,
    portal: getPortalEnv
}
