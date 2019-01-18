# VAC Benefits Directory

[![CircleCI](https://circleci.com/gh/cds-snc/vac-benefits-directory.svg?style=svg)](https://circleci.com/gh/cds-snc/vac-benefits-directory)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/vac-benefits-directory/badge.svg)](https://snyk.io/test/github/cds-snc/vac-benefits-directory)

TESTING! This is the code for the VAC Benefits Directory being developed by VAC and CDS. The app is currently deployed at
https://cdsvacpoc.azurewebsites.net/

The setup documentation can be found below. If you'd like to contribute to the project, we have more detailed documentation regarding our tech choices here: [DOCUMENTATION.md](./DOCUMENTATION.md).

## Environment variables

These need to be set on the production service for the app to function correctly.
Some are also required for testing. You will also need some of these set for local development
(at the very least, you should have `AIRTABLE_READ_KEY` and `GOOGLE_MAPS_KEY`).
Contact other developers on the project for what values we're currently using.

| Variable                     | Use                                                     | Where                           |
| ---------------------------- | ------------------------------------------------------- | ------------------------------- |
| `AIRTABLE_READ_KEY`          | load data (benefits / translations / etc) from Airtable | production / locally            |
| `GOOGLE_MAPS_KEY`            | do Google Maps queries on the map page                  | production / locally / CircleCI |
| `AIRTABLE_WRITE_KEY`         | write feedback form data to Airtable                    | production                      |
| `SENTRY_DSN`                 | save browser errors to Sentry                           | production                      |
| `GA_UA`                      | track app usage with Google Analytics                   | production                      |
| `GITHUB_PUBLIC_ACCESS_TOKEN` | gather data from GitHub for the stats page              | production                      |
| `WEBHOOK_URL`                | Sends slack deployment notifications                    | production                      |
| `BROWSERSTACK_USERNAME`      | run tests on Windows via BrowserStack                   | locally                         |
| `BROWSERSTACK_ACCESS_KEY`    | run tests on Windows via BrowserStack                   | locally                         |

### Adding a new environment locally (OS X)

1.  In the terminal, run: `nano ~/.bash_profile` (or `nano ~/.zshrc` if you're using the zsh shell)
2.  Add the following line: `export GOOGLE_MAPS_KEY="foo"`
3.  [ctrl] + x, and type `y` to save
4.  `source ~/.bash_profile` (or `source ~/.zshrc`)
5.  `echo $GOOGLE_MAPS_KEY` to make sure it is set

### Adding a new environment locally (Windows 7)

Start Menu > Control Panel > User Accounts > User Accounts > Change my environment variables > New...

Example setup:
Variable Name = AIRTABLE_READ_KEY
Contact other developers on the project for what values we're currently using.
restart Command Prompt, echo %AIRTABLE_READ_KEY% to check if value is setup properly

### Adding a new environment variable to the source code

To add a new ENV variable to the source code, take the following steps:

1.  Follow the steps above to add it locally
2.  Reference it in the src code with `process.env.YOUR_VARIABLE_NAME`
3.  Add the following lines to [Dockerfile](./Dockerfile):
    ```
    ARG YOUR_VARIABLE_NAME
    ENV YOUR_VARIABLE_NAME ${YOUR_VARIABLE_NAME}
    ```
4.  Add another build argument to [config.yml](./.circleci/config.yml):
    `--build-arg YOUR_VARIABLE_NAME="${YOUR_VARIABLE_NAME}"`
5.  Add the ENV variable to CircleCI through their web interface: https://circleci.com/gh/cds-snc/vac-benefits-directory -> Settings -> Environment Variables
6.  Add the ENV variable to Heroku through their web interface.
    It will need to be added to any production apps as well as the app that the pull request reviews are based on, namely
    [vac-poc-staging](https://dashboard.heroku.com/apps/vac-poc-staging). Go to the apps, then the Settings tab, then "Reveal Config Vars"
    and set the variable.

7.  Add `"YOUR_VARIABLE_NAME": { "required": true }` to the `env` object in [app.json](./app.json)

## Quickstart (OS X)

- Set the appropriate environment variables on your machine (see above)
- Install the development environment
  - [Homebrew](https://brew.sh/)
  - node (`brew install node`)
  - yarn (`npm i yarn`)
- Clone the repo
  - `git clone git@github.com:cds-snc/vac-benefits-directory.git`
- In the local repo directory:
  - `yarn install`
  - `yarn dev`

## Quickstart (Windows)

- Set appropriate environment variables on your machine (see above)
- Download Node.JS of version 9 or newer(as .zip since .msi is blocked)
- Following steps required tp set up the newly installed Node cmd line commands such as npm globally
  > Start menu > Control Panel > User accounts > user accounts > change my environment variables >
  > select path > Edit > Now enter the location of where you have Node installed with a ; to seperate
  > between any other entries here.
  > EX: C:\dev ; C:\Node
- `npm install -g yarn`
- `yarn install` (While in project main directory, takes a while, especially on building packages)
- `yarn dev` (run while CD'd in project folder used to start the local server)
- If you run into syntax errors chances are there are missing packages/dependencies and you may want to try
  running a clean yarn install. Delete Node_modules folder and then re run `yarn install` in the main folder.

## Reference

This application uses the following resources:

- NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
- Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
- React i18next [https://react.i18next.com/](https://react.i18next.com/)
- Prettier [https://prettier.io/](https://prettier.io/)
