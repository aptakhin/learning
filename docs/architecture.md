# Architecture Documentation

## System Overview
<!-- High-level description of the system architecture -->

This application follows a traditional client-server architecture:

```
┌─────────────┐         ┌─────────────┐
│  Frontend   │ ◄─────► │   Backend   │
│             │  HTTP   │             │
└─────────────┘         └─────────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │  Database   │
                        │   (TBD)     │
                        └─────────────┘
```

## Components

### Backend ([backend/](../backend/))
- **Language**: Rust
- **Framework**: TBD
- **Responsibilities**:
  - API endpoints
  - Business logic
  - Data persistence

### Frontend ([frontend/](../frontend/))
- **Framework**: TBD
- **Responsibilities**:
  - User interface
  - Client-side validation
  - API communication

## Data Flow
<!-- Describe how data flows through the system -->

1. User interacts with frontend
2. Frontend sends HTTP requests to backend API
3. Backend processes requests and interacts with database
4. Backend returns responses to frontend
5. Frontend updates UI based on responses

## Key Design Decisions

First impelementation of UI will be very limited as it requires too big efforts to implement own infinite boards with embedding LLM chat engines and running of agents.

Priorities:
- Reliability
- Responsibility
- Speed

Reliability of service forces to use durable worfklows for long and not very reliable backend processes (Temporal.io).

We need to provide extensability to Entity types and rules over their manage (See [entities.md](./entities.md)), so could be useful to write new extensions code also in JavaScript/TypeScript.

The initial idea was to make the fastest possible core HTTP/WebSocket api (possibly with Rust), and then all other extensions on top of that api. But for bootstraping simplicity the core now could be started also in NodeJS.

As we prioritize speed, let's avoid ORM frameworks sticking to SQL-builders for PostgreSQL database.

### Containerization Strategy
- Using Docker Compose for local development
- See [docker-compose.yaml](../docker-compose.yaml)

## Security Architecture
<!-- Security measures and considerations -->

- TBD: Authentication mechanism
- TBD: Authorization strategy
- Environment-based configuration

## Scalability Considerations
<!-- How the system can scale -->

## Future Architecture Plans
<!-- Planned improvements or changes -->
