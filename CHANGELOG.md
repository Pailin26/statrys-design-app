# Changelog

Generated from commit history — don't hand-edit entries below this line.
Use conventional commits (`feat:`, `fix:`, `chore:`) so version bumps stay automatic.

---

## 0.1.0 — Split out of the `statrys-design` monorepo
- Extracted from `packages/app-ds`, `apps/app-playground`; history preserved.
- `@statrys/tokens` switched from a workspace link to a git dependency (statrys-tokens repo)
  in both `app-ds` and `app-playground` (which reads token JSON directly for its Foundation page).
- `@statrys/icons` dropped from `app-ds`'s declared dependencies — nothing imports it yet.
