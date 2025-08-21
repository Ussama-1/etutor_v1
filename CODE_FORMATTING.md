# Code Formatting & Linting Setup

This project uses ESLint and Prettier for code formatting and linting to maintain consistent code quality and style.

## Tools Configured

### ESLint

- **Purpose**: Code linting and error detection
- **Configuration**: `.eslintrc.json`
- **Plugins**:
  - `@typescript-eslint` - TypeScript support
  - `eslint-plugin-react` - React-specific rules
  - `eslint-plugin-react-hooks` - React Hooks rules
  - `eslint-plugin-jsx-a11y` - Accessibility rules
  - `eslint-config-next` - Next.js optimized rules

### Prettier

- **Purpose**: Code formatting
- **Configuration**: `.prettierrc`
- **Ignore file**: `.prettierignore`

## Available Scripts

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is properly formatted
npm run format:check

# Run TypeScript type checking
npm run type-check

# Run all code quality checks
npm run code-quality
```

## VS Code Integration

The project includes VS Code settings (`.vscode/settings.json`) that:

- Format code on save using Prettier
- Auto-fix ESLint errors on save
- Organize imports automatically
- Set consistent tab size and spacing

### Recommended Extensions

Install these VS Code extensions for the best experience:

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript Importer (`ms-vscode.vscode-typescript-next`)

## Configuration Details

### ESLint Rules

- **No unused variables** - Error (with underscore prefix exception)
- **No console statements** - Warning
- **Prefer const** - Error
- **No var declarations** - Error
- **React in JSX scope** - Off (not needed in React 17+)
- **Prop types** - Off (using TypeScript)

### Prettier Settings

- **Semi-colons**: Always
- **Quotes**: Single quotes
- **Trailing commas**: ES5 compatible
- **Print width**: 80 characters
- **Tab width**: 2 spaces
- **JSX quotes**: Single quotes

## Usage

### Automatic Formatting (Recommended)

If you're using VS Code with the recommended extensions, code will be automatically formatted and linted when you save files.

### Manual Formatting

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check

# Fix ESLint issues
npm run lint:fix
```

### Before Committing

Run the code quality check to ensure everything is properly formatted and linted:

```bash
npm run code-quality
```

## Troubleshooting

### ESLint Errors

If you encounter ESLint errors:

1. Try running `npm run lint:fix` to auto-fix issues
2. Check the `.eslintrc.json` configuration
3. Ensure all required dependencies are installed

### Prettier Issues

If Prettier isn't working:

1. Check that the Prettier VS Code extension is installed and enabled
2. Verify the `.prettierrc` configuration
3. Try running `npm run format` manually

### Import/Export Issues

For import/export related errors:

1. Ensure proper file extensions (.ts, .tsx)
2. Check TypeScript configuration in `tsconfig.json`
3. Verify import paths are correct

## File Patterns

The following file patterns are included in formatting/linting:

- `**/*.{js,jsx,ts,tsx}` - JavaScript/TypeScript files
- `**/*.json` - JSON files
- `**/*.css` - CSS files
- `**/*.md` - Markdown files

Files and directories in `.prettierignore` are excluded from formatting.
