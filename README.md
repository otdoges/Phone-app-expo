# Gambling Simulator

A React Native gambling simulator built with Expo and Supabase, designed to demonstrate the risks of gambling in a safe, virtual environment. This project serves as an educational tool to highlight the mathematical and psychological aspects of gambling without real money involvement.

## 🎮 Features

- **Plinko Game**: A physics-based game with realistic ball movement and multipliers
- **Mines Game**: A strategic risk-based game with increasing multipliers
- **Sports Betting**: Simulated sports betting interface with real-time odds
- **Educational Statistics**: Real gambling statistics and addiction prevention resources
- **Virtual Balance System**: Risk-free gambling simulation with virtual currency
- **Dark Mode Support**: Full dark mode implementation for comfortable viewing
- **Smooth Animations**: Polished animations and transitions throughout the app
- **Persistent Data**: User progress saved securely with Supabase

## 🚀 Technologies

- [Expo](https://expo.dev/) - React Native development framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Supabase](https://supabase.com/) - Backend and authentication
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) - Advanced animations
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📱 Platforms

- Web (Primary platform)
- iOS (Through Expo)
- Android (Through Expo)

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gambling-simulator.git
cd gambling-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Project Structure

```
gambling-simulator/
├── app/                    # Application routes
│   ├── (auth)/            # Authentication routes
│   └── (tabs)/            # Main tab navigation
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── store.ts          # Zustand store
│   ├── supabase.ts       # Supabase client
│   └── theme.ts          # Theme configuration
└── supabase/             # Supabase configurations
    └── migrations/       # Database migrations
```

## 🎯 Educational Purpose

This simulator is designed to:
- Demonstrate the mathematical improbability of winning in gambling
- Highlight common psychological traps in gambling
- Provide resources for gambling addiction prevention
- Create awareness about responsible gaming

## ⚠️ Disclaimer

This application is for educational purposes only. It simulates gambling mechanics to demonstrate their risks and should not be used for real gambling. If you or someone you know has a gambling problem, please seek help:

- National Problem Gambling Helpline: 1-800-522-4700
- Visit [National Council on Problem Gambling](https://www.ncpgambling.org/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with the project, please open an issue in the GitHub repository.