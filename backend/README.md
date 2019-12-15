# Cashcog Events Management Backend
Purpose of this README file is let you know the steps for 
setting/running the backend api/scripts.

- **Prerequisites**:
  - **OS**: Linux
  - **Python**: 3.6+
  - **Database**: PostgreSQL
  
- **General Setup**:
  - Installing required packages:<br />
  `pip install requirements.txt`
  - Create a file named `local_settings.py` inside
  `cem_api/cemp_api` and place the content of `cem_api/cemp_api/ocal_settings.py.example`
   in it.(one-time process)
  - Set following postgres environment variables
    ```
    export POSTGRES_DB='cem'
    export POSTGRES_USER='postgres'
    export POSTGRES_PASSWORD='postgres'
    export POSTGRES_HOST='localhost'
    ```
  - Run migration for creating/updating database changes:<br />
    `python cem_api/manage.py migrate`
    
- **Run backend api**:<br />
  ```
  cd cem_api/
  python manage.py runserver
  ```  
- **Run backend api tests**:<br />
  ```
    cd cem_api/
    python manage.py test
    ``` 
  
- **Run events consumer script**:<br />
   ```
    cd scripts/
    python cashcog_events_consumer.py
   ```
  This command will start consuming the events from cashcog 
  stream API and will push the data into given database.