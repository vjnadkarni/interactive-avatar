# CLAUDE.md - AI Assistant Instructions

## Project: Interactive Avatar - Cathy Health & Wellness Coach

### Overview
This project implements an interactive health and wellness coaching avatar named Cathy using HeyGen's Interactive Avatar technology, Claude 4.1 Opus for AI responses, and a hybrid mobile-web architecture for comprehensive health tracking.

### Technology Stack
- **AI Framework**: Claude Code with Opus 4.1
- **LLM**: Anthropic Claude 4.1 Opus
- **Agent Framework**: LangGraph (LangChain)
- **Interactive Avatar**: HeyGen Interactive Avatar API
- **Voice**: HeyGen (initially), ElevenLabs (future)
- **Vector DB**: ChromaDB
- **Persistent DB**: Supabase (PostgreSQL)
- **Frontend**: TypeScript/JavaScript, Next.js, React
- **Mobile App**: Flutter/Dart
- **Backend**: Python with FastAPI
- **Health Data**: Apple HealthKit (iOS), Health Connect (Android - future)

### System Architecture

```
Apple Watch Series 9+ → Flutter iOS App → Backend (FastAPI) → Web App (Next.js)
                                               ↓
                                         LangGraph Agents
                                               ↓
                                       Claude 4.1 Opus + ChromaDB
                                               ↓
                                         HeyGen Avatar (Cathy)
```

### Development Workflow

#### Phase 1: Web App with Mock Data (Current)
- Build Next.js/React web application
- Integrate HeyGen Interactive Avatar
- Implement Claude 4.1 Opus conversations
- Use mock health data for testing
- Create basic LangGraph agents

#### Phase 2: Flutter Mobile App
- Create Flutter app for iOS
- Implement HealthKit integration
- Build background sync service
- Minimal UI for settings/status

#### Phase 3: Integration
- Connect Flutter app to backend API
- Replace mock data with real HealthKit data
- Implement real-time data sync
- Test end-to-end flow

#### Phase 4: Deployment
- Deploy web app to Hostinger
- Release iOS app on TestFlight
- Set up production environment

### Key Features

1. **Cathy's Personality**
   - Bubbly, engaging health coach
   - Active listener who asks clarifying questions
   - Remembers all previous conversations
   - Provides personalized recommendations

2. **Health Data Integration**
   - Real-time sync from Apple Watch 9+
   - Variable refresh intervals to optimize battery
   - Support for vitals, activities, sleep data
   - HIPAA-compliant data handling

3. **Conversation Management**
   - Full session persistence in Supabase
   - Context-aware responses using RAG
   - Multi-turn dialogue with memory
   - Voice and text interaction modes

### Git Workflow

- **Development Branch**: `wip` (work in progress)
- **Production Branch**: `main`
- **Push Script**: Use `push-wip.sh` to push to GitHub
- **Pull Script**: Use `pull-wip.sh` to sync from GitHub
- **Commit Strategy**: Regular commits with descriptive messages

### Development Guidelines

1. **Always work in the `wip` branch** during development
2. **Use mock data first** to validate features before real data integration
3. **Test avatar interactions thoroughly** before adding complexity
4. **Maintain HIPAA compliance** for all health data handling
5. **Follow TypeScript best practices** in frontend code
6. **Use Python type hints** in backend code
7. **Document API endpoints** clearly
8. **Keep API keys secure** in .env files (never commit)

### Testing Commands

```bash
# Web application (Next.js)
npm run dev        # Development server
npm run build      # Production build
npm run lint       # Lint check
npm run typecheck  # TypeScript check

# Backend (FastAPI)
python -m uvicorn main:app --reload  # Development server
pytest             # Run tests

# Flutter mobile app
flutter run        # Run on connected device
flutter build ios  # Build for iOS
```

### Environment Variables Required

- `HEYGEN_API_KEY` - HeyGen Interactive Avatar API key
- `ANTHROPIC_API_KEY` - Claude API key
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_API_URL` - Backend API URL for frontend

### Development Environment

- **Python version**: 3.13.5
- **Node.js version**: 18+ recommended
- **Flutter version**: Latest stable
- **Virtual environment**: Located in `venv/` directory

### Project Structure

```
interactive-avatar/
├── web/                # Next.js web application
├── mobile/             # Flutter mobile application
├── backend/            # Python FastAPI backend
├── shared/             # Shared utilities and types
├── docs/               # Documentation
└── venv/               # Python virtual environment
```

### Important Notes

1. **Custom Avatar**: Support for custom (non-library) avatars is required
2. **Multi-tenant**: System must support 10,000+ users
3. **Personalization**: Each user has isolated health data and conversation history
4. **Battery Optimization**: Implement smart refresh intervals for Apple Watch data
5. **Security**: All health data must be encrypted and HIPAA compliant
6. **Virtual Environment**: Always activate before installing packages or running Python scripts

### Contact

For questions about the AI implementation or architecture decisions, refer to this document first. The project aims to create a production-ready health coaching platform with emphasis on realistic human-like interactions and personalized health guidance.