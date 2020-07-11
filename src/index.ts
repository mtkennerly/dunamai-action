import * as core from "@actions/core";
import { execSync } from "child_process";

function runCommand(command: string): Buffer {
    console.log(`Running command: ${command}`);
    return execSync(command);
}

function main(): void {
    const install = core.getInput("install");
    const envVar = core.getInput("env-var");
    const command = core.getInput("command");
    const args = core.getInput("args");

    if (install === "none") {
        // No install.
    } else if (install === "latest") {
        runCommand("pip install dunamai");
    } else {
        runCommand(`pip install dunamai==${install}`);
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
