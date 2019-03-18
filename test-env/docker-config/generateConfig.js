fs = require('fs');
path = require('path');
Mustache = require('./lib/mustache');
cfCredentials = require('./lib/cfCredentials');

DEBUG = false;

/**
 * Converts a json object to an array of <KEY,VALUE> pairs, where the KEY is the first-order attribute of the JSON
 * @param {*} json 
 */
function json2map(json){
    result = [];
    // stringify non-string entries in environment
    Object.keys(json).forEach(function (key) {
        // key: the name of the object key
        entry = {};
        entry.key = key;
        if (typeof json[key] != "string")
            entry.value = JSON.stringify(json[key])
        else
            entry.value = json[key];

        result.push(entry);
    });
    return result;
}

/**
 * Prepares the data structure to be applied on the mustache template
 * @param {*} environmentData 
 */
function buildMustacheData(environmentData){
    springEnv = require('./templates/springEnvTemplate')
    springEnv.VCAP_SERVICES.xsuaa[0].credentials = environmentData[0]    

    lpdEnv = require('./templates/launchpadEnvTemplate')
    lpdEnv.VCAP_SERVICES.xsuaa[0].credentials = environmentData[0]
    lpdEnv.VCAP_SERVICES['portal-services'][0].credentials = environmentData[1]

    data = [];
    data['springEnv'] = json2map(springEnv);
    data['approuterEnv'] = json2map(lpdEnv);    
    if (DEBUG)
        console.log(data);
    return data;
}

/**
 * Applies CF environment data to a mustache-based docker-compose template
 */
async function run(){
    let envs = await Promise.all([cfCredentials.xsuaa(), cfCredentials.portal()])

    template = fs.readFileSync(path.join(__dirname, "templates", "docker-compose-template.yml"), "utf8");
    console.log(Mustache.render(template, buildMustacheData(envs)));
}


if (process.argv[2] == "-d")
{
    DEBUG = true;
    console.log("log level == DEBUG")
}   

run()