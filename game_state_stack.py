from abc import ABC, abstractmethod


# ==========================
# STACK IMPLEMENTATION
# ==========================

class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if not self.is_empty():
            return self._items.pop()
        raise Exception("Stack is empty")

    def peek(self):
        if not self.is_empty():
            return self._items[-1]
        return None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def __str__(self):
        return f"Stack: {[type(item).__name__ for item in self._items]}"


# ==========================
# GAME STATE (ABSTRACT CLASS)
# ==========================

class GameState(ABC):

    @abstractmethod
    def enter(self):
        pass

    @abstractmethod
    def exit(self):
        pass

    @abstractmethod
    def update(self):
        pass


# ==========================
# CONCRETE STATES
# ==========================

class GameplayState(GameState):

    def enter(self):
        print("Entering Gameplay State")

    def exit(self):
        print("Exiting Gameplay State")

    def update(self):
        print("Player is playing...")


class PauseState(GameState):

    def enter(self):
        print("Game Paused")

    def exit(self):
        print("Resuming Game")

    def update(self):
        print("Game is paused...")


class CutsceneState(GameState):

    def enter(self):
        print("Starting Cutscene...")

    def exit(self):
        print("Ending Cutscene... Returning to previous state")

    def update(self):
        print("Playing cinematic sequence...")


class MenuState(GameState):

    def enter(self):
        print("Opening Menu")

    def exit(self):
        print("Closing Menu")

    def update(self):
        print("Navigating Menu...")


# ==========================
# GAME ENGINE
# ==========================

class GameEngine:

    def __init__(self):
        self.state_stack = Stack()

    def push_state(self, state: GameState):
        if not self.state_stack.is_empty():
            self.state_stack.peek().exit()

        self.state_stack.push(state)
        state.enter()

    def pop_state(self):
        if not self.state_stack.is_empty():
            self.state_stack.pop().exit()

        if not self.state_stack.is_empty():
            self.state_stack.peek().enter()

    def update(self):
        if not self.state_stack.is_empty():
            self.state_stack.peek().update()
        else:
            print("No active state.")

    def show_stack(self):
        print(self.state_stack)


# ==========================
# SIMULATION
# ==========================

if __name__ == "__main__":

    game = GameEngine()

    print("\n--- Starting Game ---")
    game.push_state(GameplayState())
    game.update()

    print("\n--- Player pauses game ---")
    game.push_state(PauseState())
    game.update()

    print("\n--- Player resumes game ---")
    game.pop_state()
    game.update()

    print("\n--- Cutscene triggered ---")
    game.push_state(CutsceneState())
    game.update()

    print("\n--- Cutscene ends ---")
    game.pop_state()
    game.update()

    print("\n--- Opening Menu ---")
    game.push_state(MenuState())
    game.update()

    print("\n--- Closing Menu ---")
    game.pop_state()
    game.update()

    print("\n--- Final Stack State ---")
    game.show_stack()
