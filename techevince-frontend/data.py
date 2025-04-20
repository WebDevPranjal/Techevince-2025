import json
from urllib import request
from urllib.error import URLError, HTTPError

# URL of the admin page
url = 'https://swc.iitg.ac.in/techevince/api/admin/resources/User'

try:
    # Send a GET request to the admin page
    with request.urlopen(url) as response:
        # Check if the request was successful
        if response.getcode() == 200:
            # Read the response content
            data = response.read().decode('utf-8')
            # Parse JSON data
            json_data = json.loads(data)
            
            # Process the JSON data
            # Example: Print user data
            print(json_data)
        else:
            print("Failed to fetch data. Status code:", response.getcode())

except HTTPError as e:
    print("HTTP Error:", e.code, e.reason)
except URLError as e:
    print("URL Error:", e.reason)
except json.JSONDecodeError as e:
    print("Failed to decode JSON response:", e)






