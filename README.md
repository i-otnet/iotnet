# IoTNet

**IoTNet** is a *meta repository / aggregator* that combines multiple independent services into a unified IoT platform ecosystem.

This repository is **NOT a monorepo**. Each core service is managed as a **separate repository** and referenced through Git Submodules.

---

## 🧩 Repository Structure

```
iotnet/
├─ IoTNet-UI/                          # Frontend UI (embedded)
├─ EMQX-Auth-Service/                  # Authentication & ACL service (submodule)
├─ Multitenant-User-Management-Service # User & tenant management (submodule)
└─ README.md
```

---

## 🔗 Service Components

### 🖥️ IoTNet UI
Primary frontend application for the IoTNet platform.

- **Location:** `IoTNet-UI/`
- **Type:** Embedded folder
- **Technology Stack:** React - Nextjs

### 🔐 EMQX Authentication Service
Authentication and authorization service for EMQX (MQTT broker).

- **Repository:** https://github.com/farismnrr/EMQX-Auth-Service
- **Type:** Git Submodule
- **Responsibilities:** MQTT authentication, ACL policy management, broker integration
- **Technology Stack:** Rust - Actix

### 👤 Multitenant User Management Service
Centralized service for user, tenant, role, and cross-organization access management.

- **Repository:** https://github.com/farismnrr/Multitenant-User-Management-Service
- **Type:** Git Submodule
- **Responsibilities:** User provisioning, tenant isolation, role-based access control, multi-tenant governance
- **Technology Stack:** Rust - Actix

---

## 🧠 Architecture Principles

- **Multi-repository architecture** — Each service maintains independent lifecycle, CI/CD pipelines, and version control
- **Aggregator pattern** — Centralized entry point for project navigation, onboarding, and system visibility
- **Loose coupling** — Services can be developed and deployed independently without shared dependencies
