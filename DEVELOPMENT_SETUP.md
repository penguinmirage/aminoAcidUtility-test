# Development Setup Documentation

This document provides a comprehensive guide for setting up ESLint with Airbnb config, Prettier, Husky, and lint-staged in this React TypeScript project.

## Overview

This project now includes:
- **ESLint** with Airbnb configuration for code quality
- **Prettier** for consistent code formatting
- **Husky** for Git hooks management
- **lint-staged** for running linters on staged files only

## Installation Commands Used

### 1. Initial Package Installation
```bash
# Install core ESLint and Prettier packages
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks husky lint-staged

# Install TypeScript ESLint packages (with legacy peer deps to resolve conflicts)
npm install --save-dev @typescript-eslint/eslint-plugin@^5.62.0 @typescript-eslint/parser@^5.62.0 eslint-config-airbnb-typescript eslint-import-resolver-typescript --legacy-peer-deps
```

### 2. Husky Initialization
```bash
# Initialize Husky for Git hooks
npx husky init
```

## Configuration Files Created

### 1. ESLint Configuration (`.eslintrc.js`)

Created a comprehensive ESLint configuration with:
- Airbnb base configuration
- TypeScript support
- React and React Hooks rules
- Prettier integration
- Custom rule overrides for project-specific needs

**Key Features:**
- Extends Airbnb, TypeScript, React, and Prettier configs
- Custom rules for arrow functions, unused variables, and imports
- Special overrides for test files
- Proper TypeScript project configuration

### 2. Prettier Configuration (`.prettierrc`)

Configured Prettier with:
- Single quotes for JavaScript/TypeScript
- Semicolons enabled
- 2-space indentation
- 80 character line width
- Trailing commas in ES5 syntax
- Auto line ending handling

### 3. Prettier Ignore File (`.prettierignore`)

Excludes common directories and files:
- `node_modules/`, `build/`, `dist/`
- Environment files (`.env*`)
- IDE files (`.vscode/`, `.idea/`)
- Package manager files
- Git and other metadata

### 4. Husky Pre-commit Hook (`.husky/pre-commit`)

Configured to run lint-staged on every commit:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## Package.json Updates

### Scripts Added
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "prepare": "husky"
  }
}
```

### lint-staged Configuration
```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## Dependencies Added

### DevDependencies
- `@typescript-eslint/eslint-plugin@^5.62.0`
- `@typescript-eslint/parser@^5.62.0`
- `eslint-config-airbnb@^19.0.4`
- `eslint-config-airbnb-typescript@^18.0.0`
- `eslint-config-prettier@^10.1.5`
- `eslint-import-resolver-typescript@^4.4.3`
- `eslint-plugin-html@^8.1.3`
- `eslint-plugin-import@^2.31.0`
- `eslint-plugin-jsx-a11y@^6.10.2`
- `eslint-plugin-prettier@^5.4.1`
- `eslint-plugin-react@^7.37.5`
- `eslint-plugin-react-hooks@^5.2.0`
- `husky@^9.1.7`
- `lint-staged@^16.1.0`
- `prettier@^3.5.3`

## Code Fixes Applied

### 1. Export/Import Issues
- Changed components from default exports to named exports
- Updated index files to support both named and default exports
- Fixed import statements in test files

### 2. ESLint Rule Fixes
- Removed unused variables (`HeaderSubtitle`)
- Fixed nested ternary expressions
- Updated array keys to be more unique
- Fixed unescaped entities in JSX
- Disabled problematic rules where appropriate

### 3. Prettier Formatting
- Applied consistent formatting across all files
- Fixed quote style (single quotes)
- Standardized indentation and spacing

## Usage Instructions

### Daily Development
```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Git Workflow
The pre-commit hook automatically runs when you commit:
```bash
git add .
git commit -m "Your commit message"
# lint-staged will run automatically and fix/check staged files
```

### Manual Testing
```bash
# Test the pre-commit hook manually
npx lint-staged
```

## Troubleshooting

### Common Issues

1. **Peer Dependency Conflicts**
   - Solution: Use `--legacy-peer-deps` flag when installing packages
   - This is due to version conflicts between React Scripts and newer ESLint packages

2. **ESLint Configuration Errors**
   - Ensure `tsconfig.json` is in the project root
   - Check that all required plugins are installed
   - Verify the `parserOptions.project` path is correct

3. **Prettier vs ESLint Conflicts**
   - The configuration is set up to avoid conflicts
   - Prettier runs after ESLint in the lint-staged setup
   - If conflicts occur, prioritize Prettier formatting

### Performance Tips
- Lint-staged only runs on staged files, making commits faster
- Use `--fix` flag to automatically resolve many issues
- Consider using IDE extensions for real-time feedback

## IDE Integration

### VS Code
Recommended extensions:
- ESLint
- Prettier - Code formatter
- Auto import - ES6, TS, JSX, TSX

### Settings
Add to VS Code settings.json:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## References

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)

## Notes

- This setup prioritizes code quality and consistency
- The configuration is optimized for React TypeScript projects
- Pre-commit hooks ensure code quality before commits
- All formatting and linting rules are enforced automatically
- The setup is compatible with Create React App