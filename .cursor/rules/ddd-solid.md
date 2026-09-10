---
description: Prefer Domain-Driven Design and SOLID when structuring code
globs: src/modules/**/*
alwaysApply: false
---

# DDD & SOLID

- Domains live under `src/modules/<domain>/` (`adapters/`, `services/`, `domain/`, `utils/`, `hooks/`, `components/`, `constants/`, `types/`, store-local `actions/` as needed)
- Large domains may split into subdomains with the same layer folders inside each
- Pages stay thin; name modules after domain language from specs
- Layer roles: see [module-layers.mdc](module-layers.mdc) — `services/` = HTTP; `domain/` = business logic; `utils/` = shareable helpers; `adapters/` = external boundaries + mappers; `actions/` = store commands
- Do not use a flat `src/components/` or `src/domain/` for domain logic (module-scoped `domain/` folders are the home for business rules)
- Avoid cross-domain deep imports; skip empty layers until needed; keep `shared/` thin
- No R3F / Tailwind / GSAP inside `services/`, `domain/`, or `utils/`; `three` in `domain/` / `utils/` is OK for 3D domain code
