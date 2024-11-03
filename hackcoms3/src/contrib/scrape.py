import requests

# Define the base URL and common headers
url = "https://schedulemaker.csh.rit.edu/entity/getCourses"
headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Priority": "u=0",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache"
}

# Initialize an empty list to store the results
all_departments = []

# Loop through the department numbers from 0 to 1000
for department in range(1001):
    # Create the body for the POST request
    body = {
        "action": "getCourses",
        "term": "20241",
        "department": str(department)
    }
    
    # Send the POST request
    response = requests.post(url, headers=headers, data=body)

    # Check if the request was successful
    if response.status_code == 200:
        response_json = response.json()
        # Check if the response is not empty
        if response_json:
            all_departments.append(response_json)
            print(f"Successfully queried department {department}: {response_json}")
        else:
            print(f"No data found for department {department}, skipping.")
    else:
        print(f"Failed to query department {department}: {response.status_code}")

# Optionally, save the results to a file
with open("departments_data.json", "w") as file:
    import json
    json.dump(all_departments, file, indent=4)

print("Finished querying all departments.")
