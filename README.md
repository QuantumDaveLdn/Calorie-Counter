# Calorie Counter

A web-based application to track daily calorie intake and expenditure against a set budget, featuring a dynamic background animation.

## Features

* Set a **Daily Calorie Budget**.
* Add food items consumed for **Breakfast, Lunch, Dinner, and Snacks**.
* Log **Exercise** entries to track calories burned.
* Dynamically add multiple entries per category.
* Calculates **Total Consumed Calories**.
* Calculates **Total Burned Calories** from exercise.
* Displays **Remaining Calories** as a deficit or surplus.
* Option to **Clear All** entries and reset the form.
* Includes an interactive **particle background** using Three.js.

## How to Use

1.  Enter your target **Daily Budget** in calories.
2.  Select a category (**Breakfast, Lunch, Dinner, Snacks, Exercise**) from the "Add food or exercise" dropdown menu.
3.  Click the **"Add Entry"** button. This will add fields for an item name and its calorie count under the selected category.
4.  Fill in the **Item Name** (optional) and the **Calories** for that entry.
5.  Repeat steps 2-4 to add more food or exercise entries.
6.  Once all entries are added, click the **"Calculate Remaining Calories"** button.
7.  The results (Budget, Consumed, Burned, and Remaining Deficit/Surplus) will be displayed at the bottom.
8.  Click the **"Clear All"** button to reset the budget, all entries, and the results.

## How to View Project

```bash
# Clone the repository
git clone https://github.com/QuantumDaveLdn/Calorie-Counter.git
```
```bash
# Navigate to the project directory
cd Calorie-Counter
```

# Open index.html in your browser:
```bash
open index.html    # Mac
```

OR

```bash
start index.html   # Windows
```

# Alternative Methods
If you prefer to run it on a local server:

Using Python
```bash
# For Python 3
python3 -m http.server

# Then open in your browser:
# http://localhost:8000
```

Using Node.js
```bash
# Using npx and http-server
npx http-server

# Then open in your browser:
# http://localhost:8080
```

OR

* Visit the GitHub Pages site at: https://quantumdaveldn.github.io/Calorie-Counter/

## Technologies Used

* HTML
* CSS
* JavaScript (Vanilla)
* Three.js (for background animation)

## Project Structure

├── index.html # Main HTML file

├── styles.css # CSS for styling

├── script.js  # JavaScript for calculations and animation

├── README.md  # This file

└── LICENSE    # Project License 

└── .gitignore # Specifies files for Git to ignore

## Future Improvements 

* Add input validation with clear visual feedback (e.g., highlight invalid calorie entries).
* Implement more robust error handling (e.g., for missing budget).
* Persist data using Local Storage so entries aren't lost on refresh.
* Allow users to edit or delete individual entries.
* Improve responsiveness, especially for the entry layout on smaller screens.
* Consider adding a simple food database lookup feature.
* Add controls or options to customize the background animation.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
