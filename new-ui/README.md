# Triathlon Training Tracker

A web application built with **JavaScript/ES6** to help triathletes track and analyze their training across swimming, cycling, and running. Designed for both casual enthusiasts and competitive athletes to log sessions, monitor progress, and visualize performance trends.

## Architecture

This application implements **Gang of Four Design Patterns** and **MVVM (Model-View-ViewModel)** architecture for clean, maintainable code.

### Design Patterns Implemented

1. **Singleton Pattern** - `StorageManager`
   - Single instance manages all storage operations across the application
   - Ensures consistent state management

2. **Strategy Pattern** - Storage Strategies
   - `LocalStorageStrategy`: Browser LocalStorage for lightweight persistence
   - `IndexedDBStrategy`: IndexedDB for structured, persistent storage
   - Easy switching between storage implementations

3. **Factory Pattern** - `TrainingDrillFactory`
   - Consistent creation of TrainingDrill objects
   - Centralizes drill creation logic

4. **Observer Pattern** - ViewModel Observers
   - ViewModels notify subscribers of state changes
   - Enables reactive UI updates

### MVVM Architecture

- **Model**: `Training`, `TrainingDrill`
  - Core business logic
  - Data structures and calculations

- **ViewModel**: `TrainingViewModel`, `DrillViewModel`
  - Manages state for the view
  - Bridges Model and View
  - Handles user interactions

- **View**: `index.html`
  - User interface
  - Renders ViewModel state
  - Sends user actions to ViewModel

## Project Structure

```
src/
├── training.js                 # Training model
├── drill.js                   # TrainingDrill model
├── storage.js                 # Storage facade
├── StorageManager.js          # Singleton storage manager
├── LocalStorageStrategy.js    # LocalStorage implementation
├── IndexedDBStrategy.js       # IndexedDB implementation
├── TrainingDrillFactory.js    # Factory for drill creation
├── TrainingViewModel.js       # MVVM ViewModel for training
└── DrillViewModel.js          # MVVM ViewModel for drills

test/
├── training.test.js           # Training tests
├── drill.test.js              # Drill tests
└── storage.test.js            # Storage tests

index.html                     # Interactive UI
```

## Features

### Core Functionality
- Create training sessions with date and location
- Add training drills with swimming, running, and cycling durations
- Calculate total duration and average speed
- Track goal achievement (37.16 kph target speed)
- Sort drills by time
- Remove drills from sessions
- Update drill values

### Storage Options
- **LocalStorage**: Quick, lightweight storage for browser session
- **IndexedDB**: Structured, persistent storage for complex data queries

### User Interface
- Modern, responsive design with gradient styling
- Form-based input for creating training sessions and drills
- Real-time performance statistics
- Drill list with detailed metrics
- Goal achievement indicator
- Storage type selector (LocalStorage vs IndexedDB)

## Running Tests

```bash
npm test
```

All 38 Jest tests pass with full coverage.

## Key Classes

### Training Model
- `constructor(date, location, distance, speed)`
- `addDrill(time, swimDuration, runDuration, bikeDuration)`
- `removeDrill(targetTime)`
- `calculateAvgSpeed()`
- `isGoalReached()`
- `getGoalReach()` - returns drills meeting speed threshold
- `findTrainingDrill(targetTime)`
- `updateDrill(startTime, key, value)`
- `sortDrills()`

### TrainingDrill Model
- `constructor(dateTime, swimTime, runTime, bikeTime)`
- `calculateTotalDuration()` - returns hours
- `calculateSpeed(distanceKm)` - returns kph
- `isGoalReached(distanceKm, targetSpeed)` - returns boolean
- `formatDateTime()` - returns formatted date/time object

### StorageManager (Singleton)
- `getInstance(strategyType)` - returns singleton instance
- `setStrategy(strategyType)` - switches storage strategy
- `saveDrillToStorage(drill)`
- `saveTrainingToStorage(training)`
- `loadLocalStorage(key)`
- `loadAllLocalStorage()`

### ViewModels
- `TrainingViewModel` - manages training session state and notifications
- `DrillViewModel` - manages individual drill state and calculations

## Data Persistence

### LocalStorage
- Simple key-value pairs
- Stores: time, swimTime, runTime, bikeTime, date, location

### IndexedDB
- Object stores: `trainingSessions`, `drills`
- Supports complex queries and indexed access
- Async operations for better performance

## Testing

The application includes comprehensive tests for:
- Training session creation and management
- Drill operations (add, remove, update)
- Speed calculations and goal tracking
- Storage operations (save/load)
- Data persistence and retrieval

## Technical Stack

- **Language**: JavaScript (ES6+ modules)
- **Testing**: Jest
- **Build**: Babel (for transpilation)
- **Storage**: LocalStorage & IndexedDB APIs
- **Architecture**: MVVM + Gang of Four Patterns

## Browser Compatibility

- Modern browsers with ES6 module support
- LocalStorage support required
- IndexedDB support recommended for advanced features

## Development Notes

- Uses ES6 modules (import/export)
- Fully object-oriented design
- No external dependencies for core functionality
- JSDoc comments for code clarity
- Comprehensive error handling