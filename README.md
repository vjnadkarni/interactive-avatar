# Interactive Avatar - Cathy Health & Wellness Coach

## Overview

Interactive Avatar is an AI-powered health and wellness coaching platform featuring Cathy, a realistic interactive avatar that provides personalized health guidance through natural conversations. The system integrates real-time health data from Apple Watch, uses advanced AI for intelligent responses, and creates personalized wellness plans for users.

## Key Features

- **Interactive Avatar**: Realistic human-like avatar powered by HeyGen with natural speech, lip-sync, and gestures
- **Personalized Health Coaching**: AI-driven conversations tailored to individual health goals and conditions
- **Real-time Health Data**: Integration with Apple Watch Series 9+ for continuous health monitoring
- **Conversation Memory**: Full session persistence allowing Cathy to remember all past interactions
- **Multi-platform**: Web application for coaching sessions, mobile app for health data collection
- **HIPAA Compliant**: Secure, encrypted storage of health information

## Technology Stack

### Frontend
- **Web**: Next.js, React, TypeScript
- **Mobile**: Flutter/Dart (iOS initially, Android planned)
- **Avatar**: HeyGen Interactive Avatar SDK
- **UI Design**: Figma + v0

### Backend
- **API**: Python with FastAPI
- **AI/LLM**: Claude 4.1 Opus via Anthropic API
- **Agent Framework**: LangGraph (LangChain)
- **Vector Database**: ChromaDB for RAG
- **Persistent Database**: Supabase (PostgreSQL)

### Integrations
- **Health Data**: Apple HealthKit (iOS), Health Connect (Android - future)
- **Voice**: HeyGen (current), ElevenLabs (planned)
- **Real-time**: WebSocket for live conversations

## System Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Apple Watch 9+ │────▶│  Flutter App │────▶│  Backend API    │
└─────────────────┘     └──────────────┘     │  (FastAPI)      │
                                              └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  LangGraph      │
                                              │  Agents         │
                                              └────────┬────────┘
                                                       │
                                    ┌──────────────────┼──────────────────┐
                                    │                  │                  │
                            ┌───────▼────────┐ ┌──────▼──────┐ ┌─────────▼────────┐
                            │  Claude 4.1    │ │  ChromaDB   │ │    Supabase      │
                            │     Opus       │ │    (RAG)    │ │   (Sessions)     │
                            └────────────────┘ └─────────────┘ └──────────────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │   Web App       │
                                              │  (Next.js)      │
                                              └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  HeyGen Avatar  │
                                              │    (Cathy)      │
                                              └─────────────────┘
```

## Development Phases

### Phase 1: Web App Foundation (Current)
- Set up Next.js web application
- Integrate HeyGen Interactive Avatar
- Implement Claude 4.1 Opus conversations
- Create mock health data for testing
- Build basic conversation flow

### Phase 2: Mobile App Development
- Create Flutter iOS application
- Implement HealthKit integration
- Build background sync service
- Design minimal UI for settings

### Phase 3: System Integration
- Connect mobile app to backend
- Replace mock data with real health data
- Implement real-time synchronization
- Test end-to-end data flow

### Phase 4: Production Deployment
- Deploy web app to Hostinger
- Release iOS app on TestFlight
- Configure production environment
- Set up monitoring and analytics

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.13.5
- Flutter SDK
- Git
- Apple Developer Account (for iOS deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/interactive-avatar.git
cd interactive-avatar
```

2. Switch to development branch:
```bash
git checkout wip
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Install dependencies:

**Web Application:**
```bash
cd web
npm install
```

**Backend:**
```bash
cd backend
source ../venv/bin/activate
pip install -r requirements.txt
```

**Mobile App:**
```bash
cd mobile
flutter pub get
```

### Running the Application

**Web Development Server:**
```bash
cd web
npm run dev
# Opens at http://localhost:3000
```

**Backend API:**
```bash
cd backend
python -m uvicorn main:app --reload
# API at http://localhost:8000
```

**Mobile App:**
```bash
cd mobile
flutter run
```

## Project Structure

```
interactive-avatar/
├── web/                    # Next.js web application
│   ├── components/         # React components
│   ├── pages/             # Next.js pages
│   ├── services/          # API services
│   └── styles/            # CSS/styling
├── mobile/                 # Flutter mobile app
│   ├── lib/               # Dart source code
│   ├── ios/               # iOS specific
│   └── android/           # Android specific (future)
├── backend/                # Python FastAPI backend
│   ├── api/               # API endpoints
│   ├── agents/            # LangGraph agents
│   ├── models/            # Data models
│   └── services/          # Business logic
├── shared/                 # Shared utilities
├── docs/                   # Documentation
├── venv/                   # Python virtual environment
├── .env                    # Environment variables (not committed)
├── .gitignore             # Git ignore file
├── CLAUDE.md              # AI assistant instructions
├── README.md              # This file
├── push-wip.sh            # Script to push to GitHub
└── pull-wip.sh            # Script to pull from GitHub
```

## Development Workflow

### Git Workflow
- Development happens in `wip` branch
- Production code in `main` branch
- Use `push-wip.sh` to push changes to GitHub
- Use `pull-wip.sh` to sync from GitHub

### Commit Strategy
```bash
# Make changes in wip branch
git add .
git commit -m "feat: Add health dashboard component"
./push-wip.sh
```

### Syncing Between Machines
```bash
# On receiving machine
./pull-wip.sh
```

## Configuration

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# HeyGen
HEYGEN_API_KEY=your_heygen_api_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Session Secret
SESSION_SECRET=your_session_secret_key
```

## Testing

### Web Application
```bash
npm run lint        # Lint check
npm run typecheck   # TypeScript validation
npm run test        # Run tests
```

### Backend
```bash
pytest              # Run all tests
pytest -v          # Verbose output
```

### Mobile
```bash
flutter test        # Run Flutter tests
flutter analyze     # Static analysis
```

## Security Considerations

- All health data is encrypted at rest and in transit
- HIPAA compliance for health information handling
- API keys stored securely in environment variables
- Row-level security in database for multi-tenancy
- Regular security audits recommended

## Contributing

1. Create a feature branch from `wip`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team

## License

Proprietary - All rights reserved

## Acknowledgments

- HeyGen for Interactive Avatar technology
- Anthropic for Claude AI
- LangChain for agent framework
- Flutter team for cross-platform framework

---

**Note**: This project is under active development. Features and documentation may change.
