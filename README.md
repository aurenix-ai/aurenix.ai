# Aurenix AI - Your Personal AI Sidekick

An AI-powered platform that learns your workflow and helps you navigate the AI landscape effectively.

## Project Structure

```
aurenix.ai/
├── backend/
│   ├── api/           # FastAPI application and routes
│   ├── core/          # Core application logic
│   ├── models/        # Database models
│   ├── services/      # Business logic and external services
│   ├── utils/         # Utility functions and helpers
│   └── tests/         # Test cases
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS and style files
│   │   └── utils/       # Frontend utilities
│   └── public/          # Static files
└── docs/               # Documentation
```

## Features

- 🧠 Personalized AI Assistant
- 🛠️ Smart Tool Integration
- 📚 Learning and Skill Development
- 🤝 Team Collaboration
- 📊 Progress Tracking
- 🔒 Secure and Private

## Getting Started

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   uvicorn api.main:app --reload
   ```

### Frontend Setup (Coming Soon)

The frontend will be built with React and modern web technologies.

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.