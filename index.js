const core = require("@actions/core");
const { execSync } = require("child_process");

function runCommand(command) {
    console.log(`Running command: ${command}`);
    return execSync(command);
}

function main() {
    const install = core.getInput("install");
    const envVar = core.getInput("env-var");
    const command = core.getInput("command");
    const args = core.getInput("args");

    if (dunamaiVersion === "none") {
        // No install.
    } else if (dunamaiVersion === "latest") {
        runCommand("pip install dunamai");
    } else {
        runCommand(`pip install dunamai==${dunamaiVersion}`);
    }

    const version = runCommand(`${command} ${args}`).toString();
    core.setOutput("version", version);
    console.log(`Dynamic version: ${version}`);

    if (envVar !== "") {
        console.log(`Setting environment variable: ${envVar}`);
        core.exportVariable(envVar, version);
    }
}

try {
    main();
} catch (error) {
    core.setFailed(error.message);
}
