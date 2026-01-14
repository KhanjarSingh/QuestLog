# QuestLog - Gamified Todo App

QuestLog is a gamified task management mobile application built with React Native and Expo. Turn your daily tasks into epic quests and level up as you complete them!

## Features

- **Gamification System**: Earn XP, level up, and maintain streaks
- **Quest Management**: Create, edit, and complete tasks with categories and priorities
- **Leaderboard**: Compete with other users globally
- **User Authentication**: Secure login and signup system
- **Profile Stats**: Track your progress, XP, level, and rank
- **Category Filtering**: Organize tasks by Personal, Work, Shopping, Health, Study, and more
- **Priority Levels**: Set task priorities (High, Medium, Low) with different XP rewards

## Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Icons**: MaterialCommunityIcons
- **Backend**: Node.js REST API (separate repository)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/KhanjarSingh/QuestLog.git
cd QuestLog
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/api/client.js` to point to your backend server

4. Start the development server:
```bash
npx expo start
```

5. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Project Structure

```
QueueLog/
├── src/
│   ├── api/
│   │   └── client.js          # API client configuration
│   ├── components/
│   │   ├── AddItemModal.js    # Modal for adding new tasks
│   │   └── TodoItem.js        # Individual task item component
│   ├── screens/
│   │   ├── tabs/
│   │   │   ├── AllScreen.js   # Active quests screen
│   │   │   └── CompletedScreen.js  # Completed quests history
│   │   ├── AuthScreen.js      # Login/Signup screen
│   │   ├── LeaderboardScreen.js    # Global leaderboard
│   │   ├── SettingsScreen.js       # User profile and stats
│   │   ├── TodoDetailsScreen.js    # Navigation stacks
│   │   └── TodoEditModal.js        # Edit task modal
│   └── storage/
│       └── todos.js           # Context API and data management
├── assets/                    # Images and icons
├── App.js                     # Main app component
└── package.json
```

## Backend Repository

The backend API for this application is available at:
**https://github.com/KhanjarSingh/QuestLog-backend.git**

## Hosted Application

**Hosted Link**: [Coming Soon]

## Features in Detail

### Quest System
- Create tasks with titles, notes, categories, and priorities
- Complete tasks to earn XP based on priority level
- View quest history of completed tasks

### Gamification
- **XP System**: Earn 5 XP (Low), 10 XP (Medium), or 20 XP (High) per completed task
- **Leveling**: Level up every 100 XP
- **Streaks**: Maintain daily streaks by completing tasks
- **Rankings**: Global leaderboard ranking system

### User Profile
- View total XP, current level, and global rank
- Track completion statistics
- Monitor daily streak progress
- Category-wise task breakdown

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For any queries or suggestions, please open an issue on GitHub.
