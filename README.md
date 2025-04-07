# ATJS_LAB_Juno_Project

Website Testing Training Project

### ESLint Usage

The ESLint checks all project files with the .ts extension, excluding node_modules and root configuration files.

Linter scripts:

- **`npm run lint`**: checks for errors.
- **`npm run lint:fix`**: automatically fixes fixable errors.

### Test Execution Video Recording

Test execution is recorded and saved to the ./test-results/video directory to improve test verification and analysis. Additionally, when tests are run through GitHub Actions, these recordings are available in the Artifacts section of the completed workflow run in the Actions tab.

Video recording configuration is managed in the ./playwright.config.ts file, within the 'use' block.

Available configuration options:

1.Enable or disable video recording using the 'video' option.
2.Adjust video resolution with the 'viewport' option.
3.Set a delay between testing operations to make the video clearer using the 'slowMo' parameter in the 'launchOptions' block.
4.Specify the destination directory for saved videos using the 'outputDir' option.

###  SonarQube Usage

SonarQube is used to analyze the project's TypeScript code for quality issues, code smells, and security vulnerabilities. 
The scanner runs automatically in GitHub Actions and can also be executed locally.

Run SonarQube analysis locally:

- - **`npx sonarqube-scanner`**: This command scans the project and sends results to SonarQube.

SonarQube automatically runs as part of the CI/CD pipeline when a push or pull request is made to the main or master branch.

The scanner sends results to the SonarCloud server defined by: https://sonarcloud.io/project/overview?id=evvibrevi_ATJS_LAB_Juno_Project
