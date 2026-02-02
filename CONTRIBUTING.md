# Contributing Guide

## Engineering Standards

We follow strictly defined engineering standards to ensure codebase maintainability, scalability, and automated release management.

### 1. Git Flow & Branching Strategy

We use a simplified **Trunk Based Development** workflow or **Feature Branch** workflow depending on team size.

- **`main`**: Production-ready code. Protected branch. No direct commits (merge only).
- **`feature/name-of-feature`**: For new features.
- **`fix/issue-description`**: For bug fixes.
- **`chore/maintenance`**: For config updates, dependency upgrades.

**Why?**
- **Isolation**: Work in progress doesn't break production.
- **Code Review**: Pull Requests (PRs) allow peers to catch bugs before they merge.
- **Bisecting**: Clean history makes identifying the commit that introduced a bug trivial.

---

### 2. Semantic Commit Messages (Conventional Commits)

We use the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format**: `<type>(<scope>): <subject>`

**Types**:
- `feat`: A new feature (correlates with MINOR in SemVer)
- `fix`: A bug fix (correlates with PATCH in SemVer)
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries (e.g. documentation generation)

**Examples**:
- `feat(ui): add dark mode toggle component`
- `fix(auth): handle expired token error 401`
- `perf(image): implement lazy loading for project cards`

**Why?**
- **Automated Changelogs**: We can auto-generate release notes based on commit types.
- **Semantic Versioning**: We know exactly when to bump Major/Minor/Patch versions automatically.
- **Readability**: The git log becomes a readable history of *what* happened, not just *that* code changed.

---

### 3. Atomic Commits

Each commit should do **one thing** and do it completely.

**Bad**: "fix login and add new header and update readme" (3 things)
**Good**:
1. `fix(auth): resolve login loop`
2. `feat(layout): redesign header`
3. `docs: update setup instructions`

**Why?**
- **Revertability**: If the new header is broken, we can revert just commit #2 without breaking the login fix.
- **Reviewability**: 1000 line changes are impossible to review. 50 line changes are easy.

---

### 4. Pull Request (PR) Process

1. **Self-Review**: Review your own code specifically looking for console logs, commented outline code, and formatting issues.
2. **Context**: PR description explains *why* the change exists, not just *what* it is.
3. **CI/CD**: Automation must pass (linting, build, tests) before merging.

**Why?**
- **Quality Assurance**: Prevents "it works on my machine" errors.
- **Knowledge Sharing**: The team understands the changes being introduced.
