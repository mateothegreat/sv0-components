# `/svelte:testing-implement` Command Guide

## Overview

The `/svelte:testing-implement` command is a comprehensive testing automation tool designed specifically for Svelte 5 projects. It implements 100% test coverage for your Svelte components using modern browser testing with `vitest-browser-svelte`, following a structured 4-pass approach to ensure quality, maintainability, and reliability.

## Key Features

- **100% Test Coverage**: Achieves complete line, branch, and function coverage
- **No Mocking Policy**: Uses real implementations for authentic testing
- **Svelte 5 Native**: Built specifically for Svelte 5 runes ($state, $derived, $effect)
- **Browser Testing**: Uses real browser environment via `vitest-browser-svelte`
- **Multi-Pass Approach**: Sequential validation and implementation phases
- **Progress Tracking**: Real-time todo lists and coverage reporting

## Prerequisites

### Required Dependencies

```bash
# Core testing framework
npm install --save-dev vitest@^3.2.4

# Svelte 5 browser testing
npm install --save-dev vitest-browser-svelte@^1.1.0

# Browser testing support
npm install --save-dev @vitest/browser@^3.2.4

# Svelte framework (minimum version)
npm install svelte@^5.38.1
```

### Environment Requirements

- **Node.js**: >= 18.0.0
- **Browser**: Chromium (embedded)
- **Test Runner**: Vitest with browser mode enabled
- **Framework**: Svelte 5 with runes support

### Vitest Configuration

Your `vitest.config.ts` must include browser mode configuration:

```typescript
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

## Command Syntax

### Basic Usage

```bash
/svelte:testing-implement <path>
```

### Full Syntax with All Parameters

```bash
/svelte:testing-implement <path> [context] [goals] [test_pattern] [exclude_patterns] [priority_components]
```

## Parameters

### Required Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `path` | string | The path to code that needs test coverage | `src/components` |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `context` | string | - | Project context (monorepo? stack? pain points?) |
| `goals` | string | - | Ranked testing goals (e.g., "reduce onboarding time") |
| `test_pattern` | string | `**/*.svelte.test.ts` | Glob pattern for test files |
| `exclude_patterns` | array | `["node_modules/**", "dist/**", ".svelte-kit/**"]` | Patterns to exclude from testing |
| `priority_components` | array | - | Component paths to prioritize for testing |

## Usage Examples

### 1. Claude Code CLI

#### Basic Component Testing
```bash
claude /svelte:testing-implement src/components/Button
```

#### Comprehensive Project Testing
```bash
claude /svelte:testing-implement src/components "Monorepo with SvelteKit and Tailwind" "1. Achieve 100% coverage 2. Improve CI speed 3. Reduce onboarding time"
```

#### Advanced Configuration
```bash
claude '/svelte:testing-implement src/components "Enterprise SaaS dashboard components" "1. Reliability first 2. Accessibility compliance 3. Performance optimization" "**/*.{svelte,ts}.test.ts" ["src/legacy/**", "src/deprecated/**"] ["src/components/CriticalButton.svelte", "src/components/PaymentForm.svelte"]'
```

### 2. Claude Code Interactive UI

#### Step-by-Step Process

1. **Open Claude Code Interactive UI**
   ```bash
   claude --ui
   ```

2. **Enter the Command**
   ```
   /svelte:testing-implement src/components
   ```

3. **Follow Interactive Prompts**
   - The command will pause after each pass
   - Review progress and decide to continue or dive deeper
   - Provide additional context when prompted

#### Sample Interactive Session

```
You: /svelte:testing-implement src/components

Claude: Starting PASS 0 — Pre-Flight Validation & Environment Setup...

✅ Vitest 3.2.4 detected
✅ vitest-browser-svelte 1.1.0 detected  
✅ Node.js 18.16.0 compatible
✅ Svelte 5.38.6 detected

Found 23 Svelte components in src/components
Current coverage: 34% lines, 28% branches, 41% functions

Would you like me to continue to PASS 1 - Coverage Gap Analysis? 
Or should I go deeper on any specific area?

You: Continue to PASS 1

Claude: PASS 1 — Coverage Gap Analysis & Test Planning...

Analyzing component complexity:
- Simple (12): Button, Badge, Avatar, etc.
- Medium (7): Card, Dialog, Dropdown, etc.  
- Complex (3): DataTable, Navigation, Sidebar
- Critical (1): PaymentForm

Priority testing order established. Continue to PASS 2?

You: Yes, focus on Critical and Complex first

Claude: PASS 2 — Test Suite Implementation...
[Implements tests with real-time progress updates]
```

## Command Workflow

### PASS 0: Pre-Flight Validation & Environment Setup
- Validates all dependencies and versions
- Checks vitest configuration
- Assesses project architecture 
- Establishes baseline coverage
- Confirms testing scope and priorities

### PASS 1: Coverage Gap Analysis & Test Planning
- Scans all Svelte components
- Maps component dependencies
- Categorizes by complexity (Simple/Medium/Complex/Critical)
- Identifies coverage gaps and untested scenarios
- Creates strategic implementation roadmap

### PASS 2: Test Suite Implementation
- Creates test files following `component-name.svelte.test.ts` naming
- Implements comprehensive test suites with mandatory structure:
  - Initial Rendering tests
  - Rune State Management ($state, $derived, $effect)
  - CSS Classes and Styling
  - User Interactions
  - Content Rendering
  - Edge Cases
  - Accessibility compliance

### PASS 3: Quality Assurance & Coverage Verification
- Runs full coverage analysis
- Validates 100% coverage achievement
- Confirms zero skipped tests
- Verifies no mocking dependencies
- Ensures test quality and maintainability

### PASS 4: Documentation & Knowledge Transfer
- Documents testing patterns and best practices
- Creates reusable test utilities
- Establishes guidelines for future development
- Provides CI/CD integration recommendations

## Test Structure Example

The command generates tests following this mandatory structure:

```typescript
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Button from './Button.svelte';

describe('Button', () => {
  describe('Initial Rendering', () => {
    test('renders with default props', async () => {
      const { container } = render(Button);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    test('renders with custom text', async () => {
      const { getByRole } = render(Button, { 
        props: { children: 'Custom Text' } 
      });
      expect(getByRole('button')).toHaveTextContent('Custom Text');
    });
  });

  describe('Rune State Management', () => {
    test('handles reactive state changes', async () => {
      const { getByRole, component } = render(Button);
      
      // Test $state rune reactivity
      component.disabled = true;
      await expect.poll(() => 
        getByRole('button').getAttribute('disabled')
      ).toBe('');
    });
  });

  describe('User Interactions', () => {
    test('handles click events', async () => {
      let clicked = false;
      const { getByRole } = render(Button, {
        props: { 
          onclick: () => { clicked = true; }
        }
      });
      
      await getByRole('button').click();
      expect(clicked).toBe(true);
    });
  });

  describe('Accessibility', () => {
    test('provides proper ARIA attributes', async () => {
      const { getByRole } = render(Button, {
        props: { 'aria-label': 'Submit form' }
      });
      
      expect(getByRole('button')).toHaveAttribute('aria-label', 'Submit form');
    });
  });
});
```

## Configuration Options

### Validation Rules
- `coverage_threshold`: 100% (non-negotiable)
- `no_skipped_tests`: true (no test.skip allowed)
- `no_mocking`: true (real implementations only)
- `framework`: "svelte5" (runes required)
- `test_runner`: "vitest"
- `browser_mode`: true

### File Naming Convention
- Test files: `component-name.svelte.test.ts`
- Use `test()` function, never `it()`
- Semantic locators only: `getByRole()`, `getByLabel()`, etc.

### Environment Settings
- Browser: Chromium (headless)
- Node version: >= 18.0.0
- Timeout: 30 minutes for large codebases
- Parallel execution: Disabled (sequential passes required)

## Success Criteria

Upon completion, you will have:

✅ **100% Test Coverage**: Line, branch, and function coverage  
✅ **Zero Skipped Tests**: All tests implemented and passing  
✅ **No Mocking**: Real component behavior testing  
✅ **Svelte 5 Compliance**: Modern runes and reactive patterns  
✅ **Accessibility Verified**: ARIA compliance and keyboard navigation  
✅ **Browser Tested**: Real DOM interactions in Chromium  
✅ **Documentation**: Testing patterns and maintenance guidelines  

## Troubleshooting

### Common Issues

#### Dependency Conflicts
```bash
# Check versions
npm ls vitest vitest-browser-svelte @vitest/browser svelte

# Update to compatible versions
npm update vitest@^3.2.4 vitest-browser-svelte@^1.1.0
```

#### Coverage Not Reaching 100%
- Review generated coverage report: `coverage/index.html`
- Check for untested conditional branches
- Verify all prop combinations are tested
- Ensure error scenarios are covered

#### Tests Failing in Browser Mode
- Verify vitest.config.ts browser configuration
- Check for Node.js vs browser API differences
- Ensure proper async/await handling
- Validate DOM cleanup in test teardown

### Getting Help

For support with the `/svelte:testing-implement` command:

1. **Check Dependencies**: Ensure all required packages are installed with correct versions
2. **Review Configuration**: Verify vitest.config.ts includes browser mode
3. **Examine Logs**: Look for specific error messages in command output
4. **Progressive Implementation**: Use the multi-pass approach to isolate issues

## Best Practices

### Component Design for Testability
- Keep components focused and single-responsibility
- Expose internal state through props when needed for testing
- Use semantic HTML elements for better accessibility testing
- Implement proper error boundaries and edge case handling

### Test Maintenance
- Update tests immediately when component behavior changes
- Keep test descriptions clear and specific
- Avoid testing implementation details, focus on user behavior
- Regular coverage report review to maintain 100% threshold

### Performance Optimization
- Group related tests in describe blocks for better organization
- Use proper cleanup to prevent memory leaks
- Implement efficient wait strategies for async operations
- Monitor test execution time and optimize slow tests

---

*This command is designed to provide enterprise-grade test coverage for Svelte 5 applications, ensuring reliability, maintainability, and accessibility compliance through comprehensive browser-based testing.*