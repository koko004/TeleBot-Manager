from flask import Flask, render_template, request
import os

app = Flask(__name__)

# Define a route to render the HTML
@app.route('/')
def index():
    name = os.getenv('NAME', 'World')  # Default to 'World' if NAME is not set
    return render_template('index.html', name=name)

# Route to handle form submissions
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        # Extract data from the form
        name = request.form['name']
        # Process the data (e.g., store in a database, print, etc.)
        print(f"Received name: {name}")
        # Optionally, render a confirmation page or redirect
        return f"Form data received! Name: {name}"
    return "No data received."

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 80)))
