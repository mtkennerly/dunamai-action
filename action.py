import os
import subprocess


def run_command(command: str) -> str:
    print("Running command: {}".format(command))
    result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result.stdout.decode("utf-8").strip()


def set_output(name: str, value: str) -> None:
    with open(os.environ["GITHUB_OUTPUT"], "a") as file:
        file.write(["{}={}\n".format(name, value)])


def export_variable(name: str, value: str) -> None:
    print("Setting environment variable: {}".format(name))
    with open(os.environ["GITHUB_ENV"], "a") as file:
        file.write(["{}={}\n".format(name, value)])


def set_failed(error: Exception) -> None:
    print("::error::{}".format(error))

    stdout = getattr(error, "stdout", None)
    if stdout is not None:
        print("stdout: {}".format(stdout))

    stderr = getattr(error, "stderr", None)
    if stderr is not None:
        print("stderr: {}".format(stdout))


def main() -> None:
    install = os.environ["INPUT_INSTALL"]
    env_var = os.environ["INPUT_ENV_VAR"]
    command = os.environ["INPUT_COMMAND"]
    args = os.environ["INPUT_ARGS"]

    if install == "none":
        # No install.
        pass
    elif install == "latest":
        run_command("pip install dunamai")
    else:
        run_command("pip install dunamai=={}".format(install))

    version = run_command("{} {}".format(command, args))
    set_output("version", version)
    print("Dynamic version: {}".format(version))

    if env_var != "":
        export_variable(env_var, version)


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        set_failed(error)
        exit(1)
