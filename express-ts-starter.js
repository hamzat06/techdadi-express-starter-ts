#!/usr/bin/env node

const { program } = require("commander");
const { execSync } = require("child_process");
const readlineSync = require("readline-sync");
const path = require("path");
const fs = require("fs");

// Load configuration
const config = require("./express-ts-starter-config.json");

program
  .name(config.name)
  .description(config.description)
  .arguments("[project-directory]")
  .action((projectDirectory) => {
    let projectName = projectDirectory || "my-app";

    // If project name is not provided, ask the user for input
    if (!projectDirectory) {
      projectName = readlineSync.question(
        `Enter project name (${projectName}): `,
        {
          defaultInput: projectName,
        }
      );
    }

    // Prompt the user for their choice of package manager
    const packageManagerChoices = ["npm", "yarn"];
    const packageManagerIndex = readlineSync.keyInSelect(
      packageManagerChoices,
      "Choose a package manager:",
      { cancel: false }
    );
    const packageManager = packageManagerChoices[packageManagerIndex];

    const templatePath = path.resolve(__dirname, "starter-template");
    const projectPath = path.resolve(process.cwd(), projectName);

    // Ensure the destination directory exists or create it
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }

    try {
      // Copy starter template to project directory
      execSync(
        `rsync -av --exclude 'node_modules' ${templatePath}/ ${projectPath}`
      );

      // Install dependencies using the chosen package manager
      console.log(`Installing dependencies with ${packageManager}...`);
      execSync(`cd ${projectPath} && ${packageManager} install`);

      console.log(`Created new Express TypeScript project in ${projectName}`);
    } catch (error) {
      console.error(`Error: Failed to create project. ${error.message}`);
    }
  });

program.parse(process.argv);
