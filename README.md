# GitHub Action for Dunamai
This repository provides a GitHub Action that uses
[Dunamai](https://github.com/mtkennerly/dunamai)
to determine a dynamic version from your VCS tags.

This requires access to Python in the workflow.

## Inputs
* `install` (optional, default: `"latest"`):
  Version of Dunamai to install (e.g., "1.3.0").
  Use the default if you don't need a specific version,
  or use "none" if your workflow installs Dunamai by other means.
* `env-var` (optional, default: `""`):
  Name of environment variable in which to set the dynamic version.
  If this is empty, no environment variable will be set.
* `command` (optional, default: `"dunamai from any"`):
  Command to run Dunamai.
* `args` (optional, default: `""`):
  Additional arguments to pass to the command.

## Outputs
* `version`: The dynamic version.

## Example
```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v2
        with:
          python-version: '3.7'
      - uses: actions/checkout@v2
        with:
          # This is necessary so that we have the tags.
          fetch-depth: 0
      - uses: mtkennerly/dunamai-action@v1
        with:
          env-var: MY_VERSION
          args: --style semver
      - run: echo $MY_VERSION
```
